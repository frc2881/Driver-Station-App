import { 
  ServerMessageType,
  NetworkTablesDataType
} from "./enums";
import { 
  ServerMessage
} from "./types";

export namespace Utils {
  export const wait = async (time: number = 0): Promise<void> => {
    await new Promise(r => setTimeout(r, time * 1000));
  }

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  export const encodeServerMessage = (type: ServerMessageType, message: Record<string, any>): Uint8Array => {
    return textEncoder.encode(JSON.stringify(<ServerMessage>{ type, message }));
  }

  export const decodeServerMessage = (data: Uint8Array | ArrayBuffer): ServerMessage => {
    return JSON.parse(textDecoder.decode(data)) as ServerMessage;
  }
}
