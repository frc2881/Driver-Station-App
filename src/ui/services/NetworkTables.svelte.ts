import { SvelteMap } from "svelte/reactivity";
import { 
  type AppServerMessage,
  type NetworkTables,
  type NetworkTablesTopic,
  type NetworkTablesTopics,
  type NetworkTablesServiceMessage,
  type NetworkTablesConnectionChangedMessage,
  type NetworkTablesTopicsUpdatedMessage,
  type NetworkTablesTopicsRemovedMessage,
  NetworkTablesServiceMessageType,
  AppWindowType,
  AppServerMessageType,
  Utils
} from "../../common/index.js";

let webSocket: WebSocket;

export let NetworkTablesService: NetworkTables = $state({
  address: "0.0.0.0",
  isConnected: false,
  topics: new SvelteMap() as NetworkTablesTopics
});

export const connectNetworkTablesService = (appWindowType: AppWindowType): void => {
  webSocket = new WebSocket(`ws://127.0.0.1:2881/ws?appWindowType=${ appWindowType }`);
	webSocket.binaryType = "arraybuffer";
	webSocket.onmessage = (e) => onMessageReceived(e);
	webSocket.onerror = (e) => { console.log(e); }
}

export const updateNetworkTablesTopics = (topics: NetworkTablesTopic[]): void => {
  const topicsUpdatedMessage = {
    type: NetworkTablesServiceMessageType.TopicsUpdated,
    data: { topics }
  } as NetworkTablesTopicsUpdatedMessage;
  sendServerMessage(AppServerMessageType.NetworkTablesService, topicsUpdatedMessage);
}

const onMessageReceived = (e: MessageEvent): void => {
  const { type, message } = Utils.deserializeAppServerMessage(e.data as string);
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
      break;
    default:
      console.log("Server message:", AppServerMessageType[type], message);
      break;
  }
}

const onNetworkTablesConnectionChanged = (e: NetworkTablesConnectionChangedMessage): void => {
  const { address, isConnected } = e.data;
  NetworkTablesService.address = address;
  NetworkTablesService.isConnected = isConnected;
  if (!isConnected) {
    NetworkTablesService.topics.clear(); 
  }
}

const onNetworkTablesTopicsUpdated = (e: NetworkTablesTopicsUpdatedMessage): void => {
  for (const topic of e.data.topics) {
    NetworkTablesService.topics.set(topic.name, topic);
  }
}

const onNetworkTablesTopicsRemoved = (e: NetworkTablesTopicsRemovedMessage): void => {
  for (const topic of e.data.topics) {
    NetworkTablesService.topics.delete(topic.name);
  }
}

const sendServerMessage = (type: AppServerMessageType, message: Object): void => {
  const appServerMessage = Utils.serializeAppServerMessage(type, message);
  if (webSocket.readyState === WebSocket.OPEN) {
    webSocket.send(appServerMessage);
  }
}
