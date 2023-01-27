import { exec, execFile, spawn, ChildProcessWithoutNullStreams } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { performance } from "perf_hooks";
import { WebSocket, RawData } from "ws";
import { encode, decode } from "cbor";
import { 
  Configuration,
  Utils, 
  Platform,
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

export class NetworkTables3Service extends NetworkTablesService {
  constructor(options: NetworkTablesServiceOptions) {
    super(options);
    this.init();
  }

  private _webSocket!: WebSocket;

  private _serverTimeOffset: number = 0;
  private _serverRoundTripTime: number = 200;

  private _networkTables = {
    address: "0.0.0.0",
		isConnected: false,
		topics: new Map() as NetworkTablesTopics
	} as NetworkTables;

  private _subscriptionTopics!: RegExp;

  private _pyNetworkTablesService!: ChildProcessWithoutNullStreams;

  private init = (): void => {
    this._subscriptionTopics = new RegExp(`^(${this._networkTablesServiceOptions.subscriptionTopics.join("|").replace("/", "\\/")})`);
    this._networkTables.address = this._networkTablesServiceOptions.address;
    this.connect();
  }

  private connect = async (): Promise<void> => {
    await this.startPyNetworkTablesService();
    this._webSocket = new WebSocket(
      `ws://127.0.0.1:${ this._networkTablesServiceOptions.port }/networktables/ws`,
      [],
      { skipUTF8Validation: true, handshakeTimeout: 30000 });
    this._webSocket.binaryType = "arraybuffer";
    this._webSocket.on("open", this.onConnectionOpened);
    this._webSocket.on("close", this.onConnectionClosed);
    this._webSocket.on("message", this.onMessageReceived);
    this._webSocket.on("error", () => {});
  }

  public dispose = (): void => {
    this._webSocket.terminate();
    this.stopPyNetworkTablesService();
  }

  private reset = (): void => {
    this.dispose();
    this._networkTables.isConnected = false;
    this._networkTables.topics.clear();
  }

  private onConnectionOpened = (): void => {}

  private onConnectionClosed = async (): Promise<void> => {
    this.reset();
    this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getConnectionChangedMessage());
    await Utils.wait(3);
    this.connect();
  }

  private onMessageReceived = (message: RawData, isBinary: boolean): void => {
    if (isBinary) {
      const { r: robot, k: name, v: value } = this.decodeMessage(message);
      if (robot !== undefined) {
        this._networkTables.isConnected = robot as boolean;
        if (!this._networkTables.isConnected) {
          this.reset();
        }
        this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getConnectionChangedMessage());
      } else {
        if (name === Configuration.Settings.FPGA_TIMESTAMP_TOPIC_NAME) {
          this.setServerTimeOffset(value as number);
        }
        if (this._subscriptionTopics.test(name)) {
          let topic = this._networkTables.topics.get(name);
          if (topic) {
            topic.value = value;
            topic.timestamp = this.getServerTimestamp();
          } else {
            topic = {
              name,
              timestamp: this.getServerTimestamp(),
              type: this.getDataType(value),
              value
            } as NetworkTablesTopic 
            this._networkTables.topics.set(name, topic);
          }
          this.emit(NetworkTablesServiceMessageType.TopicsUpdated, this.getTopicsUpdatedMessage([topic]));
        }
      }
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

  public updateTopics = (topics: NetworkTablesTopic[]): void => {
    for (const topic of topics) {
      this._webSocket?.send(this.encodeMessage(topic));
    }
  }

  private getServerTimestamp = (): number => {
    return this.getLocalTimestamp() + this._serverTimeOffset;
  }

  private getLocalTimestamp = (): number => {
    return Math.floor(performance.now() * 1000);
  }

  private setServerTimeOffset = (serverTimestamp: number): void => {
    const fpgaTimestamp = Math.floor(serverTimestamp * 1000000);
    this._serverTimeOffset = fpgaTimestamp + this._serverRoundTripTime - this.getLocalTimestamp();
  }

  private decodeMessage = (message: RawData): PyNetworkTablesServiceMessage => {
    return decode(message as Buffer) as PyNetworkTablesServiceMessage;
  }

  private encodeMessage = (topic: NetworkTablesTopic): Buffer => {
    return encode({ k: topic.name, v: topic.value } as PyNetworkTablesServiceMessage);
  }

  private getDataType = (value: any): NetworkTablesDataType => {
    switch (typeof value) {
      case "boolean":
        return NetworkTablesDataType.Boolean;
      case "number":
        if (Number.isInteger(value)) {
          return NetworkTablesDataType.Integer;
        }
        return NetworkTablesDataType.Double;
      case "string":
        return NetworkTablesDataType.String;
      case "object":
        if (Array.isArray(value)) {
          switch (typeof value[0]) {
            case "string":
              return NetworkTablesDataType.StringArray; 
            case "boolean":
              return NetworkTablesDataType.BooleanArray;
            case "number":
              return NetworkTablesDataType.DoubleArray;
            default:
              break;
          }
        }
      default:
        return NetworkTablesDataType.Raw; 
    }
  }

  private startPyNetworkTablesService = async (): Promise<void> => {
    switch (process.platform) {
      case Platform.Windows:
        try {
          await writeFile(
            "resources/pynetworktables2js.exe", 
            await readFile("resources/app.asar/resources/pynetworktables2js.exe")
          );
        } catch {}
        execFile("resources/pynetworktables2js.exe", [ `--robot=${ this._networkTablesServiceOptions.address }`, `--port=${ this._networkTablesServiceOptions.port }` ]);
        break;
      case Platform.macOS:
        this._pyNetworkTablesService = spawn("python3", ["-u", "-m", "pynetworktables2js", `--robot=${ this._networkTablesServiceOptions.address }`, `--port=${ this._networkTablesServiceOptions.port }`]);
        break;
      default:
        break;
    }
  }

  private stopPyNetworkTablesService = (): void => {
    switch (process.platform) {
      case Platform.Windows:
        exec("taskkill /IM pynetworktables2js* /T /F");
        break;
      case Platform.macOS:
        this._pyNetworkTablesService?.kill();
        break;
      default:
        break;
    }
  }
}

type PyNetworkTablesServiceMessage = {
  r: boolean | undefined;
  k: string;
  v: any;
}
