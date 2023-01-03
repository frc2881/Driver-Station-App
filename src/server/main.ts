import { WebSocketServer, WebSocket } from "ws";
import { IncomingMessage } from "http";
import { 
  Utils, 
  AppWindowType,
  ServerMessageType,
  ServerMessage,
  NetworkTablesServiceMessageType,
  NetworkTablesServiceMessage,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage
} from "../common";
import { PyNetworkTablesService } from "./PyNetworkTablesService";

class Server {
  constructor() {
    process.on("disconnect", this.onProcessDisconnect);
    this.init();
  }

  private _appWindowConnections = new Map<AppWindowType, WebSocket>();
  private _webSocketServer!: WebSocketServer;
  private _networkTablesService!: PyNetworkTablesService;

  private init = async (): Promise<void> => {
    this._webSocketServer = new WebSocketServer({ port: 52881, skipUTF8Validation: true });
    this._webSocketServer.on("connection", this.onAppWindowConnectionOpened);

    this._networkTablesService = new PyNetworkTablesService();
    this._networkTablesService.on(NetworkTablesServiceMessageType.ConnectionChanged, (e: NetworkTablesConnectionChangedMessage) => {
      this.broadcastMessage(ServerMessageType.NetworkTablesService, e);
    });
    this._networkTablesService.on(NetworkTablesServiceMessageType.TopicsUpdated, (e: NetworkTablesTopicsUpdatedMessage) => {
      this.broadcastMessage(ServerMessageType.NetworkTablesService, e);
    });
  };

  private onAppWindowConnectionOpened = (connection: WebSocket, request: IncomingMessage): void => {
    const appWindowType = new URLSearchParams(new URL(request.url!, `ws://${request.headers.host}`).search).get("appWindowType") as AppWindowType;
    if (appWindowType) {
      this._appWindowConnections.get(appWindowType)?.terminate();
      this._appWindowConnections.set(appWindowType, connection);
      connection.binaryType = "arraybuffer";
      connection.on("message", this.onMessageReceived);
      this.sendMessage(
        ServerMessageType.NetworkTablesService, 
        this._networkTablesService.getNetworkTablesConnectionChangedMessage(), 
        connection
      );
      this.sendMessage(
        ServerMessageType.NetworkTablesService, 
        this._networkTablesService.getNetworkTablesTopicsUpdatedMessage(), 
        connection
      );
    }
  };

  private onMessageReceived = (data: ArrayBuffer): void => {
    const { type, message } = Utils.decodeServerMessage(data) as ServerMessage;
    switch (type) {
			case ServerMessageType.NetworkTablesService:
				switch ((message as NetworkTablesServiceMessage).type) {
					case NetworkTablesServiceMessageType.TopicsUpdated:
            const { data: { topics } } = message as NetworkTablesTopicsUpdatedMessage;
            this._networkTablesService.updateNetworkTablesTopics(topics);
						break;
					default:
						break;
				}
				break;
			default:
				console.log("Server message:", ServerMessageType[type], message);
				break;
		}
  };

  private sendMessage = (type: ServerMessageType, message: Object, connection: WebSocket): void => {
    const serverMessage = Utils.encodeServerMessage(type, message);
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(serverMessage, { binary: true });
    }
  };

  private broadcastMessage = (type: ServerMessageType, message: Object): void => {
    const serverMessage = Utils.encodeServerMessage(type, message);
    for (const connection of this._appWindowConnections.values()) {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(serverMessage, { binary: true });
      }
    }
  };

  private onProcessDisconnect = (): void => {
    this._networkTablesService?.dispose();
    process.exit(0);
  };
}

new Server();