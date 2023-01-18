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
  NetworkTablesTopicsUpdatedMessage
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

  private _decoder = new Decoder();
  private _encoder = new Encoder();

  private _webSocket!: WebSocket;
  
  private _serverTimeOffset!: number;
  private _serverRoundTripTime = Number.MAX_SAFE_INTEGER;

  private _networkTables = {
    address: "0.0.0.0",
		isConnected: false,
		topics: new Map() as NetworkTablesTopics
	} as NetworkTables;

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
    this._webSocket.on("error", () => {});
  }

  public dispose = (): void => {
    this._webSocket.terminate();
  }

  private reset = (): void => {
    this._networkTables.isConnected = false;
    this._networkTables.topics.clear();
  }

  private onConnectionOpened = (): void => {
    this._networkTables.isConnected = true;
    this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getConnectionChangedMessage());
    this.runServerTimestampSynchronization();
    this.subscribe();
  }

  private onConnectionClosed = async (): Promise<void> => {
    this.reset();
    this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getConnectionChangedMessage());
    await Utils.wait(3);
    this.connect();
  }

  private onMessageReceived = (message: RawData, isBinary: boolean): void => {
    const __topics = [] as NetworkTablesTopic[];
    if (isBinary) {
      const topics = this.decodeBinaryDataFrame(message);
      for (const topic of topics) {
        if (topic.id === -1) {
          this.setServerTimeOffset(topic.timestamp!, topic.value as number);
        } else {
          const __topic = this._networkTables.topics.get(topic.id!);
          if (__topic) {
            __topic.value = topic.value;
            __topic.timestamp = topic.timestamp;
            __topics.push(__topic);
          }
        }
      }
    } else {
      const textDataFrame = this.decodeTextDataFrame(message);
      for (const textDataFrameMessage of textDataFrame) {
        switch (textDataFrameMessage.method) {
          case TextDataFrameMessageMethod.Announce:
            const topic = textDataFrameMessage.params as TopicAnnouncementMessage;
            const __topic = {
              id: topic.id,
              name: topic.name,
              timestamp: 0,
              type: this.getDataType(topic.type),
              value: null
            } as NetworkTablesTopic;
            this._networkTables.topics.set(topic.id, __topic);
            __topics.push(__topic);
            break;
          default:
            break;
        }
      }
    }
    if (__topics.length !== 0) {
      this.emit(NetworkTablesServiceMessageType.TopicsUpdated, this.getTopicsUpdatedMessage(__topics));
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

  private runServerTimestampSynchronization = async (): Promise<void> => {
    const topic: NetworkTablesTopic = {
      id: -1,
      name: "RTT",
      timestamp: 0,
      type: NetworkTablesDataType.Integer,
      value: 0
    };
    while (this._networkTables.isConnected) {
      topic.value = this.getLocalTimestamp();
      this._webSocket?.send(this.encodeBinaryDataFrame([topic]));
      await Utils.wait(3);
    }
  }

  private subscribe = (): void => {
    const subscription = {
      method: TextDataFrameMessageMethod.Subscribe,
      params: {
        topics: ["/"],
        subuid: 0,
        options: { all: true, prefix: true }
      }
    } as TextDataFrameMessage;
    this._webSocket.send(this.encodeTextDataFrame([subscription]));
  }

  public updateTopics = (topics: NetworkTablesTopic[]): void => {}

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
      this._serverTimeOffset = serverTimestamp + roundTripTime - currentLocalTimestamp;
    }
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
      const { id, timestamp, type, value } = topic;
      messages.push(this._encoder.encode([ id, timestamp, type, value ] as BinaryDataFrameMessage));
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
  
  private getDataType = (type: string): NetworkTablesDataType => {
    switch (type) {
      case "boolean":
        return NetworkTablesDataType.Boolean;
      case "double":
        return NetworkTablesDataType.Double;
      case "int":
        return NetworkTablesDataType.Integer;
      case "float":
        return NetworkTablesDataType.Float;
      case "string":
      case "json":
        return NetworkTablesDataType.String;
      case "raw":
      case "rpc":
      case "msgpack":
      case "protobuf":
        return NetworkTablesDataType.Binary;
      case "boolean[]":
        return NetworkTablesDataType.BooleanArray;
      case "double[]":
        return NetworkTablesDataType.DoubleArray;
      case "int[]":
        return NetworkTablesDataType.IntegerArray;
      case "float[]":
        return NetworkTablesDataType.FloatArray;
      case "string[]":
        return NetworkTablesDataType.StringArray;
      default:
        return NetworkTablesDataType.Any; 
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
  id: number;
  name: string;
  properties: {
    persistent: boolean;
    retained: boolean;
  }
  type: string;
}