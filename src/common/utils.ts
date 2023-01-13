import { AppServerMessageType } from "./enums";
import { AppServerMessage } from "./types";

export namespace Utils {
  export const wait = async (time: number = 0): Promise<void> => {
    await new Promise(r => setTimeout(r, time * 1000));
  };

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  export const encodeAppServerMessage = (type: AppServerMessageType, message: Record<string, any>): Uint8Array => {
    return textEncoder.encode(JSON.stringify(<AppServerMessage>{ type, message }));
  };

  export const decodeAppServerMessage = (data: Uint8Array | ArrayBuffer): AppServerMessage => {
    return JSON.parse(textDecoder.decode(data)) as AppServerMessage;
  };
}
