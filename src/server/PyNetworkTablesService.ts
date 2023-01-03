import { exec, execFile, spawn, ChildProcessWithoutNullStreams } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { WebSocket, RawData } from "ws";
import { encode, decode } from "cbor";
import { 
  Utils, 
  Platform,
  NetworkTablesServiceMessageType,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage,
  NetworkTables,
  NetworkTablesTopic,
  NetworkTablesDataType
} from "../common";
import { TypedEventEmitter, NetworkTablesServiceMessages, PyNetworkTablesServiceMessage } from "./types";

export class PyNetworkTablesService extends TypedEventEmitter<NetworkTablesServiceMessages> {
  constructor(
    robotAddress: string, 
    robotTimeTopicName: string
  ) {
    super();
    this._robotAddress = robotAddress;
    this._robotTimeTopicName = robotTimeTopicName;
    this.init();
  }

  private readonly _robotAddress: string;
  private readonly _robotTimeTopicName: string;

  private _robotTimeTopicIndex: number = -1;
  private _webSocket!: WebSocket;
  private _pynetworktables2jsProcess!: ChildProcessWithoutNullStreams;
  
  private _networkTables: NetworkTables = {
		isConnected: false,
		topics: []
	};

  private init = async (): Promise<void> => {
    switch (process.platform) {
      case Platform.Windows:
        try {
          await writeFile(
            "resources/pynetworktables2js.exe", 
            await readFile("resources/app.asar/resources/pynetworktables2js.exe")
          );
        } catch {}
        execFile("resources/pynetworktables2js.exe", [ `--robot=${ this._robotAddress }`, "--port=5810" ]);
        break;
      case Platform.macOS:
        this._pynetworktables2jsProcess = spawn("python3", ["-u", "-m", "pynetworktables2js", `--robot=${ this._robotAddress }`, "--port=5810"]);
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
        exec("taskkill /t /f /im pynetworktables2js.exe");
        break;
      case Platform.macOS:
        this._pynetworktables2jsProcess?.kill();
        break;
      default:
        break;
    }
  };

  private connect = (): void => {
    this._webSocket = new WebSocket("ws://127.0.0.1:5810/networktables/ws");
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
        const topics: NetworkTablesTopic[] = [topic];
        if (this._robotTimeTopicIndex === -1) {
          const index = this._networkTables.topics.findIndex(topic => topic.name === this._robotTimeTopicName);
          if (index !== -1) {
            this._robotTimeTopicIndex = index;
            const timestamp = this._networkTables.topics[this._robotTimeTopicIndex]?.value as number;
            for (const topic of this._networkTables.topics) {
              if (topic.timestamp === 0) {
                topic.timestamp = timestamp;
                topics.push(topic);
              }
            }
          }
        }
        this.emit(NetworkTablesServiceMessageType.TopicsUpdated, this.getNetworkTablesTopicsUpdatedMessage(topics));
      }
    }
  };

  public getNetworkTablesConnectionChangedMessage = (): NetworkTablesConnectionChangedMessage => {
    return {
      type: NetworkTablesServiceMessageType.ConnectionChanged,
      data: { isConnected: this._networkTables.isConnected }
    } as NetworkTablesConnectionChangedMessage;
  };

  public getNetworkTablesTopicsUpdatedMessage = (topics: NetworkTablesTopic[] | null = null): NetworkTablesTopicsUpdatedMessage => {
    return {
      type: NetworkTablesServiceMessageType.TopicsUpdated,
      data: { topics: topics ?? this._networkTables.topics }
    } as NetworkTablesTopicsUpdatedMessage;
  };

  public updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {
    for (const topic of topics) {
      this._webSocket?.send(encode({"k": topic.name, "v": topic.value}));
    }
  };

  private resetNetworkTables = (): void => {
    this._robotTimeTopicIndex = -1;
    this._networkTables.topics = [];
  };

  private getNetworkTablesTimestamp = (name: string, value: any): number => {
    return (name === this._robotTimeTopicName) ? 
      value as number : 
      this._networkTables.topics[this._robotTimeTopicIndex]?.value as number ?? 0;
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
