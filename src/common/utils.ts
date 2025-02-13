import { addMilliseconds, format } from "date-fns";
import type { AppServerMessageType } from "./enums.js";
import type { AppServerMessage, NetworkTables, Pose2d } from "./types.js";

export namespace Utils {

  export const wait = async (time: number = 0): Promise<void> => {
    await new Promise(r => setTimeout(r, time * 1000));
  }

  export const deserializeAppServerMessage = (data: string): AppServerMessage => {
    return JSON.parse(data) as AppServerMessage;
  }

  export const serializeAppServerMessage = (type: AppServerMessageType, message: Record<string, any>): string => {
    return JSON.stringify(<AppServerMessage>{ type, message });
  }

  export const radiansToDegrees = (radians: number): number => {
    return radians / (Math.PI / 180);
  }

  export const isNumberInRange = (value: number, minValue: number, maxValue: number): boolean => {
    return value >= minValue && value <= maxValue;
  }

  export const getDistance = (robotPose: Pose2d, targetPose: Pose2d) => {
    return Math.sqrt(((targetPose.x - robotPose.x) ** 2) + ((targetPose.y - robotPose.y) ** 2));
  }

  const baseTime = new Date();
  baseTime.setHours(0, 0, 0, 0);

  export const formatTimestamp = (timestamp: number): string => {
    return format(convertTimestamp(timestamp), "H:mm:ss.SSS");
  }

  export const convertTimestamp = (timestamp: number): Date => {
    return timestamp ? addMilliseconds(baseTime, timestamp / 1000) : baseTime;
  }

  export const stringifyNetworkTables = (networkTables: NetworkTables, space?: string | number): string => {
    return JSON.stringify(networkTables, (key, value) => { return (value instanceof Map) ? Object.fromEntries(value.entries()) : value }, space);
  }
}
