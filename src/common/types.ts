import { 
  ServerMessageType,
  NetworkTablesServiceMessageType,
  NetworkTablesDataType 
} from "./enums";

export type ServerMessage = {
  type: ServerMessageType;
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
  };
}

export type NetworkTablesTopicsUpdatedMessage = NetworkTablesServiceMessage & {
  data: { 
    topics: NetworkTablesTopic[]; 
  };
}

export type NetworkTablesTopic = {
  id: number;
  timestamp: number;
  type: NetworkTablesDataType;
  name: string;
  value: any;
}

export type NetworkTables = {
  address: string;
  isConnected: boolean;
  topics: NetworkTablesTopic[];
}

export type Position = {
  x: number;
  y: number;
}
