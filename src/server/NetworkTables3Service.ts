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
  NetworkTablesTopic,
  NetworkTablesDataType,
  NetworkTablesServiceMessageType,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage
} from "../common";
import { 
  NetworkTablesService, 
  NetworkTablesServiceOptions,
  PyNetworkTablesServiceMessage 
} from "./types";

export class NetworkTables3Service extends NetworkTablesService {
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

  private _pynetworktables2jsService!: ChildProcessWithoutNullStreams;

  private init = async (): Promise<void> => {
    this._networkTables.address = this._networkTablesServiceOptions.address;
    await this.startpynetworktables2jsService();
    this.connect();
  }

  public dispose = (): void => {
    this._webSocket.terminate();
    this.stoppynetworktables2jsService();
  }

  private connect = (): void => {
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

  private reset = (): void => {
    this._networkTables.isConnected = false;
    this._networkTables.topics = [];
  }

  private onConnectionOpened = (): void => {}

  private onConnectionClosed = async (): Promise<void> => {
    this.reset();
    await Utils.wait(5);
    this.connect();
  }

  private onMessageReceived = (message: RawData, isBinary: boolean): void => {
    if (isBinary) {
      const { r: robot, k: name, v: value } = decode(message as Buffer) as PyNetworkTablesServiceMessage;
      if (robot !== undefined) {
        this._networkTables.isConnected = robot as boolean;
        if (!this._networkTables.isConnected) {
          this.reset();
        }
        this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getNetworkTablesConnectionChangedMessage());
      } else {
        if (name === Configuration.Settings.FPGA_TIMESTAMP_TOPIC_NAME) {
          const fpgaTimestamp = value as number;
          this._serverTimeOffset = fpgaTimestamp + this._serverRoundTripTime - this.getLocalTimestamp();
          console.log(fpgaTimestamp);
        } else {
          const topic: NetworkTablesTopic = {
            id: 0,
            timestamp: this.getNetworkTablesServerTimestamp(),
            type: this.getNetworkTablesDataType(value),
            name,
            value
          };
          const index = this._networkTables.topics.findIndex(t => t.name === topic.name);
          if (index !== -1) {
            this._networkTables.topics[index] = topic;
          } else {
            this._networkTables.topics.push(topic);
          }
          this.emit(NetworkTablesServiceMessageType.TopicsUpdated, this.getNetworkTablesTopicsUpdatedMessage([ topic ]));
        }
      }
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

  public updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {
    for (const topic of topics) {
      this._webSocket?.send(encode({"k": topic.name, "v": topic.value}));
    }
  }

  private getNetworkTablesDataType = (value: any): NetworkTablesDataType => {
    switch (typeof value) {
      case "boolean":
        return NetworkTablesDataType.boolean;
      case "number":
        if (Number.isInteger(value)) {
          return NetworkTablesDataType.integer;
        }
        return NetworkTablesDataType.double;
      case "string":
        return NetworkTablesDataType.string;
      case "object":
        if (Array.isArray(value)) {
          switch (typeof value[0]) {
            case "string":
              return NetworkTablesDataType.stringArray; 
            case "boolean":
              return NetworkTablesDataType.booleanArray;
            case "number":
              return NetworkTablesDataType.doubleArray;
            default:
              break;
          }
        }
      default:
        break;
    }
    return NetworkTablesDataType.any; 
  }

  private getNetworkTablesServerTimestamp = (): number => {
    return this.getLocalTimestamp() + this._serverTimeOffset;
  }

  private getLocalTimestamp = (): number => {
    return Math.floor(performance.now() * 1000);
  }

  private startpynetworktables2jsService = async (): Promise<void> => {
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
        this._pynetworktables2jsService = spawn("python3", ["-u", "-m", "pynetworktables2js", `--robot=${ this._networkTablesServiceOptions.address }`, `--port=${ this._networkTablesServiceOptions.port }`]);
        break;
      default:
        break;
    }
  }

  private stoppynetworktables2jsService = (): void => {
    switch (process.platform) {
      case Platform.Windows:
        exec("taskkill /IM pynetworktables2js* /T /F");
        break;
      case Platform.macOS:
        this._pynetworktables2jsService?.kill();
        break;
      default:
        break;
    }
  }
}
