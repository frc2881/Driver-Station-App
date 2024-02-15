import { Rectangle } from "electron";
import { AppServerMessageType, NetworkTablesServiceMessageType, NetworkTablesDataType } from "./enums";
import { ParsedArgs } from "minimist";

export type ConfigurationSettings = {
  NetworkTables: {
    ServerAddress: string;
    ServerPort: number;
    Subscriptions: string[];
    Topics: Record<string, string>;
  };
  CameraStreams: Record<string, string>;
  MatchTime: {
    Warning: number;
    Critical: number;
  };
  BatteryVoltage: {
    Low: number;
    Warning: number;
    Critical: number;
  };
  Layout: {
    MaxWidth: number;
    MaxHeight: number;
    DockedHeight: number;
  };
}

export type AppArguments = ParsedArgs & {
  serverAddress: string;
}

export type AppWindowOptions = {
  title: string;
  bounds: Rectangle;
  isMinimized: boolean;
  isTransparent: boolean;
  isFrameless: boolean;
  isFullscreen: boolean;
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
  name: string;
  id: number;
  pubuid?: number;
  timestamp?: number;
  type: NetworkTablesDataType;
  value?: any;
}

export type NetworkTablesTopics = Map<string, NetworkTablesTopic>;

export type NetworkTables = {
  address: string;
  isConnected: boolean;
  topics: NetworkTablesTopics;
}

export type Pose2d = {
  translation: { x: number; y: number; }
  rotation: { radians: number; }
}

export type Pose3d = {
  translation: { x: number; y: number; z: number }
  rotation: { quaternion: { W: number; X: number; Y: number; Z: number; } }
}

export type PoseInfo = {
  x: number;
  y: number;
  rotation: number;
}