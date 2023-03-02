import { performance } from "perf_hooks";
import { WebSocket, RawData } from "ws";
import { Encoder, Decoder } from "@msgpack/msgpack";
import { 
  Utils, 
  NetworkTables,
  NetworkTablesDataType,
  NetworkTablesTopic,
  NetworkTablesTopics,
  NetworkTablesServiceMessageType,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage,
  NetworkTablesTopicsRemovedMessage
} from "../common";
import { 
  NetworkTablesService,
  NetworkTablesServiceOptions
} from "./types";

export class NetworkTables4Service extends NetworkTablesService {
  constructor(options: NetworkTablesServiceOptions) {
    super(options);
    this.init();
  }

  private _webSocket!: WebSocket;
  private _decoder = new Decoder();
  private _encoder = new Encoder();

  private _isServerTimeSynchronized: boolean = false;
  private _serverTimeOffset: number | undefined;
  private _serverRoundTripTime = Number.MAX_SAFE_INTEGER;
  private _pubuid: number = 0;

  private _networkTables = {
    address: "0.0.0.0",
		isConnected: false,
		topics: new Map() as NetworkTablesTopics
	} as NetworkTables;

  private _networkTablesLookup = new Map<number, string>();

  private init = async (): Promise<void> => {
    this._networkTables.address = this._networkTablesServiceOptions.address;
    this.connect();
  }

  private connect = (): void => {
    this._webSocket = new WebSocket(
      `ws://${ this._networkTablesServiceOptions.address }:${ this._networkTablesServiceOptions.port }/nt/frc-driver-station-app`, 
      ["networktables.first.wpi.edu"], 
      { skipUTF8Validation: true, handshakeTimeout: 30000 }
    );
    this._webSocket.binaryType = "arraybuffer";
    this._webSocket.on("open", this.onConnectionOpened);
    this._webSocket.on("close", this.onConnectionClosed);
    this._webSocket.on("message", this.onMessageReceived);
    this._webSocket.on("error", (e) => { console.log(e); });
  }

  public dispose = (): void => {
    this._webSocket.terminate();
  }

  private reset = (): void => {
    this._networkTables.isConnected = false;
    this._networkTables.topics.clear();
    this._networkTablesLookup.clear();
    this._isServerTimeSynchronized = false;
    this._serverTimeOffset = undefined;
    this._serverRoundTripTime = Number.MAX_SAFE_INTEGER;
    this._pubuid = 0;
  }

  private onConnectionOpened = (): void => {
    this.reset();
    this._networkTables.isConnected = true;
    this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getConnectionChangedMessage());
    this.runServerTimestampSynchronization();
    this.subscribeTopics(this._networkTablesServiceOptions.subscriptionTopics);
  }

  private onConnectionClosed = async (): Promise<void> => {
    this.reset();
    this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getConnectionChangedMessage());
    await Utils.wait(3);
    this.connect();
  }

  private onMessageReceived = (message: RawData, isBinary: boolean): void => {
    const updatedTopics__ = [] as NetworkTablesTopic[];
    const removedTopics__ = [] as NetworkTablesTopic[];
    if (isBinary) {
      const topics = this.decodeBinaryDataFrame(message);
      for (const topic of topics) {
        if (topic.id === -1) {
          this.setServerTimeOffset(topic.timestamp!, topic.value as number);
        } else {
          const __topic = this.getTopic(topic.id!);
          if (__topic) {
            __topic.value = topic.value;
            __topic.timestamp = topic.timestamp;
            updatedTopics__.push(__topic);
          }
        }
      }
    } else {
      const textDataFrame = this.decodeTextDataFrame(message);
      for (const textDataFrameMessage of textDataFrame) {
        switch (textDataFrameMessage.method) {
          case TextDataFrameMessageMethod.Announce:
            const topic = textDataFrameMessage.params as TopicAnnouncementMessage;
            let __topic = this.getTopic(topic.name!);
            if (!__topic) {
              __topic = {
                name: topic.name,
                type: this.convertDataType(topic.type)
              } as NetworkTablesTopic; 
            }
            __topic.id = topic.id;
            __topic.pubuid = topic.pubuid;
            this._networkTables.topics.set(__topic.name!, __topic);
            this._networkTablesLookup.set(__topic.id, __topic.name!);
            updatedTopics__.push(__topic);
            break;
          case TextDataFrameMessageMethod.Unannounce:
            const { name, id } = textDataFrameMessage.params as TopicRemovalMessage;
            removedTopics__.push({ name } as NetworkTablesTopic);
            this._networkTables.topics.delete(name);
            this._networkTablesLookup.delete(id);
            break;
          default:
            // TODO: implement other message types as needed
            console.log(textDataFrameMessage);
            break;
        }
      }
    }
    if (updatedTopics__.length > 0) {
      this.emit(NetworkTablesServiceMessageType.TopicsUpdated, this.getTopicsUpdatedMessage(updatedTopics__));
    }
    if (removedTopics__.length > 0) {
      this.emit(NetworkTablesServiceMessageType.TopicsRemoved, this.getTopicsRemovedMessage(removedTopics__));
    }
  }

  public getConnectionChangedMessage = (): NetworkTablesConnectionChangedMessage => {
    return {
      type: NetworkTablesServiceMessageType.ConnectionChanged,
      data: { 
        address: this._networkTables.address,
        isConnected: this._networkTables.isConnected 
      }
    } as NetworkTablesConnectionChangedMessage;
  }

  public getTopicsUpdatedMessage = (topics: NetworkTablesTopic[] | null = null): NetworkTablesTopicsUpdatedMessage => {
    return {
      type: NetworkTablesServiceMessageType.TopicsUpdated,
      data: { 
        topics: topics ?? Array.from(this._networkTables.topics.values()) as NetworkTablesTopic[]
      }
    } as NetworkTablesTopicsUpdatedMessage;
  }

  public getTopicsRemovedMessage = (topics: NetworkTablesTopic[]): NetworkTablesTopicsRemovedMessage => {
    return {
      type: NetworkTablesServiceMessageType.TopicsRemoved,
      data: { 
        topics
      }
    } as NetworkTablesTopicsRemovedMessage;
  }

  private runServerTimestampSynchronization = async (): Promise<void> => {
    const topic: NetworkTablesTopic = {
      id: -1,
      name: "RTT",
      pubuid: -1,
      timestamp: 0,
      type: NetworkTablesDataType.Integer,
      value: 0
    };
    while (this._networkTables.isConnected) {
      this._isServerTimeSynchronized = false;
      topic.value = this.getLocalTimestamp();
      this._webSocket?.send(this.encodeBinaryDataFrame([topic]));
      await Utils.wait(3);
      if (!this._isServerTimeSynchronized) {
        this._webSocket?.terminate();
        break;
      }
    }
  }

  private subscribeTopics = (topics: string[]): void => {
    const subscribeMessage = {
      method: TextDataFrameMessageMethod.Subscribe,
      params: {
        topics,
        subuid: 2881,
        options: { prefix: true }
      }
    } as TextDataFrameMessage;
    this._webSocket.send(this.encodeTextDataFrame([subscribeMessage]));
  }

  public updateTopics = (topics: NetworkTablesTopic[]): void => {
    const topics__ = [] as NetworkTablesTopic[];
    const publishMessages = [] as TextDataFrameMessage[];
    for (const topic of topics) {
      let __topic = this.getTopic(topic.name!);
      if (!__topic) {
        __topic = {
          name: topic.name,
          type: topic.type,
        } as NetworkTablesTopic;
      }
      if (!__topic.pubuid) {
        __topic.pubuid = this._pubuid += 1;
        publishMessages.push({
          method: TextDataFrameMessageMethod.Publish,
          params: {
            name: __topic.name,
            pubuid: __topic.pubuid,
            type: this.convertDataType(__topic.type!),
            properties: { retained: true }
          }
        } as TextDataFrameMessage);
      }
      __topic.timestamp = this.getServerTimestamp();
      __topic.value = topic.value;
      this._networkTables.topics.set(__topic.name!, __topic);
      topics__.push(__topic);
    }
    if (publishMessages.length > 0) {
      this._webSocket.send(this.encodeTextDataFrame(publishMessages));
    }
    this._webSocket.send(this.encodeBinaryDataFrame(topics__));
    this.emit(NetworkTablesServiceMessageType.TopicsUpdated, this.getTopicsUpdatedMessage(topics__));
  }

  private getServerTimestamp = (): number => {
    return this._serverTimeOffset ? this.getLocalTimestamp() + this._serverTimeOffset : 0;
  }

  private getLocalTimestamp = (): number => {
    return Math.floor(performance.now() * 1000);
  }

  private setServerTimeOffset = (serverTimestamp: number, lastLocalTimestamp: number): void => {
    const currentLocalTimestamp = this.getLocalTimestamp();
    const roundTripTime = (currentLocalTimestamp - lastLocalTimestamp) / 2;
    if (roundTripTime < this._serverRoundTripTime) { 
      this._serverRoundTripTime = roundTripTime;
      this._serverTimeOffset = Math.floor(serverTimestamp + roundTripTime - currentLocalTimestamp);
    }
    this._isServerTimeSynchronized = true;
  }

  private decodeBinaryDataFrame = (message: RawData): NetworkTablesTopic[] => {
    const topics = [] as NetworkTablesTopic[];
    const binaryDataFrame = this._decoder.decodeMulti(message as Buffer) as Generator<BinaryDataFrameMessage>;
    for (const binaryDataFrameMessage of binaryDataFrame) {
      topics.push({
        id: binaryDataFrameMessage[0],
        timestamp: binaryDataFrameMessage[1],
        type: binaryDataFrameMessage[2],
        value: binaryDataFrameMessage[3]
      } as NetworkTablesTopic);
    }
    return topics;
  }

  private encodeBinaryDataFrame = (topics: NetworkTablesTopic[]): Uint8Array => {
    const messages = [] as Uint8Array[];
    for (const topic of topics) {
      const { pubuid, timestamp, type, value } = topic;
      messages.push(this._encoder.encode([ pubuid, timestamp, type, value ] as BinaryDataFrameMessage));
    }
    const binaryDataFrame = new Uint8Array(messages.reduce((s, e) => e.length + s, 0));
    let offset = 0;
    for (const message of messages) {
      binaryDataFrame.set(message, offset);
      offset += message.length;
    }
    return binaryDataFrame;
  }

  private decodeTextDataFrame = (message: RawData): TextDataFrameMessage[] => {
    return JSON.parse(message.toString());
  }

  private encodeTextDataFrame = (textDataFrame: TextDataFrameMessage[]): string => {
    return JSON.stringify(textDataFrame);
  }

  private getTopic = (prop: string | number): NetworkTablesTopic | undefined => {
    return (typeof prop === "string") ? 
      this._networkTables.topics.get(prop) : 
      this._networkTables.topics.get(this._networkTablesLookup.get(prop)!);
  }

  private convertDataType = (type: string | NetworkTablesDataType): string | NetworkTablesDataType => {
    switch (type) {
      case NetworkTablesDataType.Boolean: return "boolean";
      case "boolean": return NetworkTablesDataType.Boolean;
      case NetworkTablesDataType.Double: return "double"; 
      case "double": return NetworkTablesDataType.Double; 
      case NetworkTablesDataType.Integer: return "int";
      case "int": return NetworkTablesDataType.Integer;
      case NetworkTablesDataType.Float: return "float";
      case "float": return NetworkTablesDataType.Float;
      case NetworkTablesDataType.String: return "string";
      case "string": case "json": return NetworkTablesDataType.String;
      case NetworkTablesDataType.BooleanArray: return "boolean[]";
      case "boolean[]": return NetworkTablesDataType.BooleanArray;
      case NetworkTablesDataType.DoubleArray: return "double[]";
      case "double[]": return NetworkTablesDataType.DoubleArray;
      case NetworkTablesDataType.IntegerArray: return "integer[]";
      case "integer[]": return NetworkTablesDataType.IntegerArray;
      case NetworkTablesDataType.FloatArray: return "float[]";
      case "float[]": return NetworkTablesDataType.FloatArray;
      case NetworkTablesDataType.StringArray: return "string[]";
      case "string[]": return NetworkTablesDataType.StringArray;
      case NetworkTablesDataType.Raw: return "raw";
      case "raw": case "rpc": case "msgpack": case "protobuf": return NetworkTablesDataType.Raw;
      default: return (typeof type === "string") ? NetworkTablesDataType.Raw : "raw";
    }
  }
}

enum TextDataFrameMessageMethod {
  Publish = "publish",
  Unpublish = "unpublish",
  SetProperties = "setproperties",
  Subscribe = "subscribe",
  Unsubscribe = "unsubscribe",
  Announce = "announce",
  Unannounce = "unannounce",
  Properties = "properties"
}

type TextDataFrameMessage = {
  method: TextDataFrameMessageMethod;
  params: object;
}

type BinaryDataFrameMessage = [ 
  id: number, 
  timestamp: number, 
  type: NetworkTablesDataType, 
  value: any 
]

type TopicAnnouncementMessage = {
  name: string;
  id: number;
  type: string;
  pubuid: number;
  properties: {
    persistent: boolean;
    retained: boolean;
  }
}

type TopicRemovalMessage = {
  name: string;
  id: number;
}