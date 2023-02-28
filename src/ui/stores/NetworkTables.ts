import { writable } from "svelte/store";
import { 
  Configuration,
  Utils,
  AppWindowType, 
  AppServerMessageType,
  AppServerMessage,
  NetworkTables,
  NetworkTablesTopic,
  NetworkTablesTopics,
  NetworkTablesServiceMessageType,
  NetworkTablesServiceMessage,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage,
  NetworkTablesTopicsRemovedMessage
} from "../../common";

let _webSocket: WebSocket;

let _networkTables: NetworkTables = {
  address: "",
  isConnected: false,
  topics: new Map() as NetworkTablesTopics
};

export const NetworkTablesStore = writable(_networkTables);

export const connectNetworkTablesStore = (appWindowType: AppWindowType): void => {
  console.log("network tables connected");
  _webSocket = new WebSocket(`ws://127.0.0.1:${ Configuration.Settings.APP_SERVER_PORT }/ws?appWindowType=${ appWindowType }`);
	_webSocket.binaryType = "arraybuffer";
	_webSocket.onmessage = (e) => onMessageReceived(e);
	_webSocket.onerror = (e) => { console.log(e); }
}

export const updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {
  const topicsUpdatedMessage = {
    type: NetworkTablesServiceMessageType.TopicsUpdated,
    data: { topics }
  } as NetworkTablesTopicsUpdatedMessage;
  sendServerMessage(AppServerMessageType.NetworkTablesService, topicsUpdatedMessage);
}

const onMessageReceived = (e: MessageEvent): void => {
  const { type, message } = Utils.decodeAppServerMessage(e.data as Uint8Array) as AppServerMessage;
  switch (type) {
    case AppServerMessageType.NetworkTablesService:
      switch ((message as NetworkTablesServiceMessage).type) {
        case NetworkTablesServiceMessageType.ConnectionChanged:
          onNetworkTablesConnectionChanged(message as NetworkTablesConnectionChangedMessage);
          break;
        case NetworkTablesServiceMessageType.TopicsUpdated:
          onNetworkTablesTopicsUpdated(message as NetworkTablesTopicsUpdatedMessage);
          break;
        case NetworkTablesServiceMessageType.TopicsRemoved:
          onNetworkTablesTopicsRemoved(message as NetworkTablesTopicsRemovedMessage);
          break;
        default:
          break;
      }
      NetworkTablesStore.set(_networkTables);
      break;
    default:
      console.log("Server message:", AppServerMessageType[type], message);
      break;
  }
}

const onNetworkTablesConnectionChanged = (e: NetworkTablesConnectionChangedMessage): void => {
  const { address, isConnected } = e.data;
  _networkTables.address = address;
  _networkTables.isConnected = isConnected;
  if (!isConnected) {
    _networkTables.topics.clear(); 
  }
}

const onNetworkTablesTopicsUpdated = (e: NetworkTablesTopicsUpdatedMessage): void => {
  for (const topic of e.data.topics) {
    _networkTables.topics.set(topic.name, topic);
  }
}

const onNetworkTablesTopicsRemoved = (e: NetworkTablesTopicsRemovedMessage): void => {
  for (const topic of e.data.topics) {
    _networkTables.topics.delete(topic.name);
  }
}

const sendServerMessage = (type: AppServerMessageType, message: Object): void => {
  const appServerMessage = Utils.encodeAppServerMessage(type, message);
  if (_webSocket.readyState === WebSocket.OPEN) {
    _webSocket.send(appServerMessage);
  }
}
