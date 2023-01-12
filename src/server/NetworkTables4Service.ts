import { performance } from "perf_hooks";
import { WebSocket, RawData } from "ws";
import { encode, decode } from "@msgpack/msgpack";
import { 
  Utils, 
  NetworkTables,
  NetworkTablesTopic,
  NetworkTablesDataType,
  NetworkTablesServiceMessageType,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage
} from "../common";
import { 
  NetworkTablesService,
  NetworkTablesServiceOptions,
  NetworkTablesBinaryDataFrame
} from "./types";

export class NetworkTables4Service extends NetworkTablesService {
  constructor(options: NetworkTablesServiceOptions) {
    super(options);
    this.init();
  }

  private _webSocket!: WebSocket;
  
  private _serverTimeOffset!: number;
  private _serverRoundTripTime: number = 1000;

  private _networkTables: NetworkTables = {
    address: "",
		isConnected: false,
		topics: []
	};

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
    this._networkTables.topics = [];
  }

  private onConnectionOpened = (): void => {
    this._networkTables.isConnected = true;
    this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getNetworkTablesConnectionChangedMessage());
    this.runServerTimestampSynchronization();
  }

  private onConnectionClosed = async (): Promise<void> => {
    this.reset();
    this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getNetworkTablesConnectionChangedMessage());
    await Utils.wait(5);
    this.connect();
  }

  private onMessageReceived = (message: RawData, isBinary: boolean): void => {
    // TODO: implement all of this including timestamp sync, server announcements, topic subscriptions, value updates, etc.
    if (isBinary) {
      const topic = this.decodeNetworkTablesBinaryFrame(message);
      const index = this._networkTables.topics.findIndex(t => t.id === topic.id);
      if (index !== -1) {
        this._networkTables.topics[index] = topic;
      } else {
        this._networkTables.topics.push(topic);
      }
      this.emit(NetworkTablesServiceMessageType.TopicsUpdated, this.getNetworkTablesTopicsUpdatedMessage([ topic ]));
    } else {
      console.log(message);
    }
  }

  public getNetworkTablesConnectionChangedMessage = (): NetworkTablesConnectionChangedMessage => {
    return {
      type: NetworkTablesServiceMessageType.ConnectionChanged,
      data: { 
        address: this._networkTables.address,
        isConnected: this._networkTables.isConnected 
      }
    } as NetworkTablesConnectionChangedMessage;
  }

  public getNetworkTablesTopicsUpdatedMessage = (topics: NetworkTablesTopic[] | null = null): NetworkTablesTopicsUpdatedMessage => {
    return {
      type: NetworkTablesServiceMessageType.TopicsUpdated,
      data: { 
        topics: topics ?? this._networkTables.topics 
      }
    } as NetworkTablesTopicsUpdatedMessage;
  }

  public updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {}

  private getNetworkTablesServerTimestamp = (): number => {
    return 0;
  }

  private runServerTimestampSynchronization = async (): Promise<void> => {
    const topic: NetworkTablesTopic = {
      id: -1,
      name: "",
      timestamp: 0,
      type: NetworkTablesDataType.integer,
      value: 0
    };
    while (this._networkTables.isConnected) {
      topic.value = this.getLocalTimestamp();
      this._webSocket?.send(this.encodeNetworkTablesBinaryFrame(topic));
      await Utils.wait(3);
    }
  }

  private getLocalTimestamp = (): number => {
    return Math.floor(performance.now() * 1000);
  }

  private decodeNetworkTablesBinaryFrame = (message: RawData): NetworkTablesTopic => {
    const binaryFrame = decode(message as Buffer) as NetworkTablesBinaryDataFrame;
    return {
      id: binaryFrame[0],
      name: "",
      timestamp: binaryFrame[1],
      type: binaryFrame[2],
      value: binaryFrame[3]
    } as NetworkTablesTopic;
  }

  private encodeNetworkTablesBinaryFrame = (topic: NetworkTablesTopic): Uint8Array => {
    return encode([ topic.id, topic.timestamp, topic.type, topic.value ] as NetworkTablesBinaryDataFrame);
  }
}
