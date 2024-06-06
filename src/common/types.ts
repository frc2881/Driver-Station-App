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
  Cameras: {
    Robot: Record<string, string>;
    DriverStation: string;
  } 
  MatchTime: {
    Warning: number;
    Critical: number;
  };
  BatteryVoltageLevel: {
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

export type CameraStreamInfo = {
  url?: string;
  device?: string;
}

export type Pose2d = {
  x: number;
  y: number;
  rotation: number;
}

export type Pose3d = {
  x: number;
  y: number;
  z: number;
  rotation: number;
}