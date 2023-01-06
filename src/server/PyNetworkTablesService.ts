import { exec, execFile, spawn, ChildProcessWithoutNullStreams } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { WebSocket, RawData } from "ws";
import { encode, decode } from "cbor";
import { 
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
  TypedEventEmitter, 
  NetworkTablesServiceOptions,
  NetworkTablesServiceMessages, 
  PyNetworkTablesServiceMessage 
} from "./types";

export class PyNetworkTablesService extends TypedEventEmitter<NetworkTablesServiceMessages> {
  constructor(options: NetworkTablesServiceOptions) {
    super();
    this._networkTablesServiceOptions = options;
    this.init();
  }

  private readonly _FPGATimestampTopicName: string = "/SmartDashboard/Timing/FPGATimestamp"; // TODO: move back into common configuration module

  private readonly _networkTablesServiceOptions: NetworkTablesServiceOptions;
  
  private _pynetworktables2jsService!: ChildProcessWithoutNullStreams;
  private _webSocket!: WebSocket;
  private _FPGATimestamp: number = 0;
  
  private _networkTables: NetworkTables = {
    address: "",
		isConnected: false,
		topics: []
	};

  private init = async (): Promise<void> => {
    this._networkTables.address = this._networkTablesServiceOptions.address;
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
    this.connect();
  };

  public dispose = (): void => {
    this._webSocket.terminate();
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
  };

  private connect = (): void => {
    this._webSocket = new WebSocket(`ws://127.0.0.1:${ this._networkTablesServiceOptions.port }/networktables/ws`);
    this._webSocket.binaryType = "arraybuffer";
    this._webSocket.on("open", () => {});
    this._webSocket.on("error", () => {});
    this._webSocket.on("message", this.onMessageReceived);
    this._webSocket.on("close", async () => {
      await Utils.wait(3);
      this.connect();
    });
  };

  private onMessageReceived = (message: RawData, isBinary: boolean): void => {
    if (isBinary) {
      const { r: robot, k: name, v: value } = decode(message as Buffer) as PyNetworkTablesServiceMessage;
      if (robot !== undefined) {
        const isConnected = robot as boolean;
        this._networkTables.isConnected = isConnected;
        // TODO: determine if we want to keep last networktables state around when robot disconnects and reset on next connection
        if (!isConnected) {
          this.resetNetworkTables();
        }
        this.emit(NetworkTablesServiceMessageType.ConnectionChanged, this.getNetworkTablesConnectionChangedMessage());
      } else {
        const topic: NetworkTablesTopic = {
          id: 0,
          timestamp: this.getNetworkTablesTimestamp(name, value),
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
  };

  public getNetworkTablesConnectionChangedMessage = (): NetworkTablesConnectionChangedMessage => {
    return {
      type: NetworkTablesServiceMessageType.ConnectionChanged,
      data: { 
        address: this._networkTables.address,
        isConnected: this._networkTables.isConnected 
      }
    } as NetworkTablesConnectionChangedMessage;
  };

  public getNetworkTablesTopicsUpdatedMessage = (topics: NetworkTablesTopic[] | null = null): NetworkTablesTopicsUpdatedMessage => {
    return {
      type: NetworkTablesServiceMessageType.TopicsUpdated,
      data: { 
        topics: topics ?? this._networkTables.topics 
      }
    } as NetworkTablesTopicsUpdatedMessage;
  };

  public updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {
    for (const topic of topics) {
      this._webSocket?.send(encode({"k": topic.name, "v": topic.value}));
    }
  };

  private resetNetworkTables = (): void => {
    this._FPGATimestamp = 0;
    this._networkTables.topics = [];
  };

  private getNetworkTablesTimestamp = (name: string, value: any): number => {
    if (name === this._FPGATimestampTopicName) {
      this._FPGATimestamp = value;
    }
    return this._FPGATimestamp;
  };

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
  };
};
