import { WebSocketServer, WebSocket } from "ws";
import type { IncomingMessage } from "http";
import minimist from "minimist";
import { 
  type AppArguments, 
  type AppServerMessage,
  type NetworkTablesServiceMessage,
  type NetworkTablesConnectionChangedMessage,
  type NetworkTablesTopicsUpdatedMessage,
  type NetworkTablesTopicsRemovedMessage,
  type AppWindowType,
  AppServerMessageType,
  NetworkTablesServiceMessageType,
  Utils,
  Configuration
} from "../common/index.js";
import { NetworkTablesService } from "./NetworkTablesService.js";

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

    this._webSocketServer = new WebSocketServer({ port: 2881, skipUTF8Validation: true });
    this._webSocketServer.on("connection", this.onAppWindowConnectionOpened);

    this._networkTablesService = new NetworkTablesService({ 
      address: args.serverAddress, 
      port: Configuration.Settings.NetworkTables.ServerPort,
      subscriptionTopics: Configuration.Settings.NetworkTables.Subscriptions ?? ["/"]
    });
    
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

  private onMessageReceived = (data: string): void => {
    const { type, message } = Utils.deserializeAppServerMessage(data);
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
    const serverMessage = Utils.serializeAppServerMessage(type, message);
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(serverMessage, { binary: false });
    }
  }

  private broadcastMessage = (type: AppServerMessageType, message: Object): void => {
    const serverMessage = Utils.serializeAppServerMessage(type, message);
    for (const connection of this._appWindowConnections.values()) {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(serverMessage, { binary: false });
      }
    }
  }

  private onProcessDisconnect = (): void => {
    this._webSocketServer.close();
    this._networkTablesService?.dispose();
  }
}

new Server();