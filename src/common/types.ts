import { 
  AppServerMessageType,
  NetworkTablesServiceMessageType,
  NetworkTablesDataType 
} from "./enums";
import { ParsedArgs } from "minimist";

export type Position = {
  x: number;
  y: number;
}

export type AppArguments = ParsedArgs & {
  ntServerAddress: string;
  ntVersion: number;
}

export type AppServerMessage = {
  type: AppServerMessageType;
  message: Record<string, any>;
}

export type NetworkTablesServiceMessage = {
  type: NetworkTablesServiceMessageType;
  data: Record<string, any>;
}

export type NetworkTablesConnectionChangedMessage = NetworkTablesServiceMessage & {
  data: { 
    address: string;
    isConnected: boolean; 
  }
}

export type NetworkTablesTopicsUpdatedMessage = NetworkTablesServiceMessage & {
  data: { 
    topics: NetworkTablesTopic[]; 
  }
}

export type NetworkTablesTopicsRemovedMessage = NetworkTablesServiceMessage & {
  data: { 
    topics: NetworkTablesTopic[]; 
  }
}

export type NetworkTablesTopic = {
  name?: string;
  id?: number;
  pubuid?: number;
  timestamp?: number;
  type?: NetworkTablesDataType;
  value?: any;
}

export type NetworkTablesTopics = Map<string, NetworkTablesTopic>;

export type NetworkTables = {
  address: string;
  isConnected: boolean;
  topics: NetworkTablesTopics;
}

export type ConfigurationSettings = {
  Defaults: {
    NT_SERVER_ADDRESS: string;
    NT_VERSION: number;
  };
  APP_SERVER_PORT: number;
  NT3_SERVER_PORT: number;
  NT4_SERVER_PORT: number;
  FPGA_TIMESTAMP_TOPIC_NAME: string;
  SUBSCRIPTION_TOPICS: string[];
}
