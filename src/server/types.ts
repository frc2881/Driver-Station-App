import { EventEmitter } from "events";
import { 
  NetworkTablesServiceMessageType,
  NetworkTablesConnectionChangedMessage,
  NetworkTablesTopicsUpdatedMessage,
  NetworkTablesTopic,
  NetworkTablesDataType
} from "../common";

export type EmittedEvents = Record<string | symbol, (...args: any) => any>;

export declare interface TypedEventEmitter<Events extends EmittedEvents> {
  on<E extends keyof Events>(event: E, listener: Events[E]): this;
  emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): boolean;
}

export class TypedEventEmitter<Events extends EmittedEvents> extends EventEmitter {}

export type NetworkTablesServiceOptions = {
  address: string;
  port: number;
}

export type NetworkTablesServiceMessages = {
  [NetworkTablesServiceMessageType.ConnectionChanged]: (event: NetworkTablesConnectionChangedMessage) => void;
  [NetworkTablesServiceMessageType.TopicsUpdated]: (event: NetworkTablesTopicsUpdatedMessage) => void;
}

export abstract class NetworkTablesService extends TypedEventEmitter<NetworkTablesServiceMessages> {
  protected readonly _networkTablesServiceOptions: NetworkTablesServiceOptions;
  constructor(options: NetworkTablesServiceOptions) {
    super();
    this._networkTablesServiceOptions = options;
  }
  public abstract dispose(): void;
  public abstract getConnectionChangedMessage(): NetworkTablesConnectionChangedMessage;
  public abstract getTopicsUpdatedMessage(): NetworkTablesTopicsUpdatedMessage;
  public abstract updateTopics(topics: NetworkTablesTopic[]): void;
}

export type NetworkTablesBinaryDataFrame = [ 
  id: number, 
  timestamp: number, 
  type: NetworkTablesDataType, 
  value: any 
]

export type PyNetworkTablesServiceMessage = {
  r: boolean | undefined;
  k: string;
  v: any;
}
