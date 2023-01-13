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

export type NetworkTablesTopic = {
  id: number;
  name: string;
  timestamp: number;
  type: NetworkTablesDataType;
  value: any;
}

export type NetworkTables = {
  address: string;
  isConnected: boolean;
  topics: NetworkTablesTopic[];
}
