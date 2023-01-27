import { WebSocketServer, WebSocket } from "ws";
import { IncomingMessage } from "http";
import minimist from "minimist";
import { 
  Configuration,
  Utils,
  AppArguments, 
  AppWindowType,
  AppServerMessageType,
  AppServerMessage,
  NetworkTablesServiceMessageType,
  NetworkTablesServiceMessage,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage,
  NetworkTablesTopicsRemovedMessage
} from "../common";
import { NetworkTablesService } from "./types";
import { NetworkTables4Service } from "./NetworkTables4Service";
import { NetworkTables3Service } from "./NetworkTables3Service";

class Server {
  constructor() {
    process.on("disconnect", this.onProcessDisconnect);
    this.init();
  }

  private _appWindowConnections = new Map<AppWindowType, WebSocket>();
  private _webSocketServer!: WebSocketServer;

  private _networkTablesService!: NetworkTablesService;

  private init = async (): Promise<void> => {
    const args = minimist(process.argv) as AppArguments;

    this._webSocketServer = new WebSocketServer({ port: Configuration.Settings.APP_SERVER_PORT, skipUTF8Validation: true });
    this._webSocketServer.on("connection", this.onAppWindowConnectionOpened);

    switch (args.ntVersion) {
      case 4:
        this._networkTablesService = new NetworkTables4Service({ address: args.ntServerAddress, port: Configuration.Settings.NT4_SERVER_PORT });
        break;
      case 3:
        this._networkTablesService = new NetworkTables3Service({ address: args.ntServerAddress, port: Configuration.Settings.NT3_SERVER_PORT });
        break;
      default:
        throw new Error(`NT version ${ args.ntVersion } is invalid or not supported.`);
    }
    
    this._networkTablesService.on(NetworkTablesServiceMessageType.ConnectionChanged, (e: NetworkTablesConnectionChangedMessage) => {
      this.broadcastMessage(AppServerMessageType.NetworkTablesService, e);
    });

    this._networkTablesService.on(NetworkTablesServiceMessageType.TopicsUpdated, (e: NetworkTablesTopicsUpdatedMessage) => {
      this.broadcastMessage(AppServerMessageType.NetworkTablesService, e);
    });

    this._networkTablesService.on(NetworkTablesServiceMessageType.TopicsRemoved, (e: NetworkTablesTopicsRemovedMessage) => {
      this.broadcastMessage(AppServerMessageType.NetworkTablesService, e);
    });
  }

  private onAppWindowConnectionOpened = (connection: WebSocket, request: IncomingMessage): void => {
    const appWindowType = new URLSearchParams(new URL(request.url!, `ws://${request.headers.host}`).search).get("appWindowType") as AppWindowType;
    if (appWindowType) {
      this._appWindowConnections.get(appWindowType)?.terminate();
      this._appWindowConnections.set(appWindowType, connection);
      connection.binaryType = "arraybuffer";
      connection.on("message", this.onMessageReceived);
      this.sendMessage(
        AppServerMessageType.NetworkTablesService, 
        this._networkTablesService.getConnectionChangedMessage(), 
        connection
      );
      this.sendMessage(
        AppServerMessageType.NetworkTablesService, 
        this._networkTablesService.getTopicsUpdatedMessage(), 
        connection
      );
    }
  }

  private onMessageReceived = (data: ArrayBuffer): void => {
    const { type, message } = Utils.decodeAppServerMessage(data) as AppServerMessage;
    switch (type) {
			case AppServerMessageType.NetworkTablesService:
				switch ((message as NetworkTablesServiceMessage).type) {
					case NetworkTablesServiceMessageType.TopicsUpdated:
            const { data: { topics } } = message as NetworkTablesTopicsUpdatedMessage;
            this._networkTablesService.updateTopics(topics);
						break;
					default:
						break;
				}
				break;
			default:
				console.log("Server message:", AppServerMessageType[type], message);
				break;
		}
  }

  private sendMessage = (type: AppServerMessageType, message: Object, connection: WebSocket): void => {
    const serverMessage = Utils.encodeAppServerMessage(type, message);
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(serverMessage, { binary: true });
    }
  }

  private broadcastMessage = (type: AppServerMessageType, message: Object): void => {
    const serverMessage = Utils.encodeAppServerMessage(type, message);
    for (const connection of this._appWindowConnections.values()) {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(serverMessage, { binary: true });
      }
    }
  }

  private onProcessDisconnect = (): void => {
    this._webSocketServer.close();
    this._networkTablesService?.dispose();
  }
}

new Server();