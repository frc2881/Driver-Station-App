import dayjs from "dayjs";
import { AppServerMessageType } from "./enums";
import { AppServerMessage, NetworkTables } from "./types";

export namespace Utils {

  export const wait = async (time: number = 0): Promise<void> => {
    await new Promise(r => setTimeout(r, time * 1000));
  }

  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();

  export const decodeAppServerMessage = (data: Uint8Array | ArrayBuffer): AppServerMessage => {
    return JSON.parse(textDecoder.decode(data)) as AppServerMessage;
  }

  export const encodeAppServerMessage = (type: AppServerMessageType, message: Record<string, any>): Uint8Array => {
    return textEncoder.encode(JSON.stringify(<AppServerMessage>{ type, message }));
  }

  export const isNumberInRange = (value: number, minValue: number, maxValue: number): boolean => {
    return value >= minValue && value <= maxValue;
  }

  const baseTime = dayjs(0).startOf("d");

  export const formatTimestamp = (timestamp: number): string => {
    return baseTime.add(timestamp / 1000, "ms").format("H:mm:ss.SSS");
  }

  export const convertTimestamp = (timestamp: number): Date => {
    return baseTime.add(timestamp / 1000, "ms").toDate();
  }

  export const stringifyNetworkTables = (networkTables: NetworkTables, space?: string | number): string => {
    return JSON.stringify(networkTables, (key, value) => { return (value instanceof Map) ? Object.fromEntries(value.entries()) : value }, space);
  }
}
