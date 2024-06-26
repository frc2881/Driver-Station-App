import { EventEmitter } from "events";
import type { 
  NetworkTablesServiceMessageType,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage,
  NetworkTablesTopicsRemovedMessage
} from "../common/index.js";

export type EmittedEvents = Record<string | symbol, (...args: any) => any>;

export declare interface TypedEventEmitter<Events extends EmittedEvents> {
  on<E extends keyof Events>(event: E, listener: Events[E]): this;
  emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): boolean;
}

export class TypedEventEmitter<Events extends EmittedEvents> extends EventEmitter {}

export type NetworkTablesServiceOptions = {
  address: string;
  port: number;
  subscriptionTopics: string[];
}

export type NetworkTablesServiceMessages = {
  [NetworkTablesServiceMessageType.ConnectionChanged]: (event: NetworkTablesConnectionChangedMessage) => void;
  [NetworkTablesServiceMessageType.TopicsUpdated]: (event: NetworkTablesTopicsUpdatedMessage) => void;
  [NetworkTablesServiceMessageType.TopicsRemoved]: (event: NetworkTablesTopicsRemovedMessage) => void;
}
