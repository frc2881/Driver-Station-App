import { Camera } from "./common/enums";
import { ConfigurationSettings } from "./common/types";

export namespace Configuration {
  export const Settings: ConfigurationSettings = {
    Networking: {
      ServerAddress: "127.0.0.1",
      ServerPort: 5810,
      AppPort: 2881
    },
    NetworkTables: {
      Subscriptions: [
        "/SmartDashboard",
        "/photonvision",
        "/FMSInfo",
        "/LiveWindow"
      ]
    },
    Cameras: {
      [Camera.Front]: "http://10.28.81.6:1182/?action=stream",
      [Camera.Rear]: "http://10.28.81.6:1184/?action=stream",
      [Camera.Side]: "http://10.28.81.6:1186/?action=stream"
    },
    MatchTimeTriggers: {
      Warning: 35,
      Critical: 10
    },
    Windows: {
      MaxWidth: 1920,
      MaxHeight: 1080,
      DockedHeight: 248
    }
  }
}