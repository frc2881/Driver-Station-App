import { 
  NetworkTables 
} from "../../common";

export namespace Utils {
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

