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

  export const stringifyNetworkTables = (networkTables: NetworkTables, space?: string | number): string => {
    return JSON.stringify(networkTables, (key, value) => { return (value instanceof Map) ? Object.fromEntries(value.entries()) : value }, space);
  }

  export const formatFPGATimestamp = (timestamp: number): string => {
    const hours = Math.floor(timestamp / 1000 / 60 / 60);
    const minutes = Math.floor((timestamp / 1000 / 60 / 60 - hours) * 60);
    const seconds = ((timestamp / 1000 / 60 / 60 - hours) * 60 - minutes) * 60;
    return `${hours}:${`${ minutes < 10 ? "0": "" }${minutes}`}:${`${ seconds < 10 ? "0": "" }${seconds.toFixed(3)}`}`;
  }
}
