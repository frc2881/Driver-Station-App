import { EventEmitter } from "events";
import { 
  NetworkTablesServiceMessageType,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage
} from "../common";

export type EmittedEvents = Record<string | symbol, (...args: any) => any>;

export declare interface TypedEventEmitter<Events extends EmittedEvents> {
  on<E extends keyof Events>(event: E, listener: Events[E]): this;
  emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): boolean;
}

export class TypedEventEmitter<Events extends EmittedEvents> extends EventEmitter {}

export type NetworkTablesServiceMessages = {
  [NetworkTablesServiceMessageType.ConnectionChanged]: (event: NetworkTablesConnectionChangedMessage) => void;
  [NetworkTablesServiceMessageType.TopicsUpdated]: (event: NetworkTablesTopicsUpdatedMessage) => void;
};

export type PyNetworkTablesServiceMessage = {
  r: boolean | undefined;
  k: string;
  v: any;
};
