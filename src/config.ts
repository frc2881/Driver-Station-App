import { ConfigurationSettings } from "./common";

export namespace Configuration {
  export const Settings: ConfigurationSettings = {
    NetworkTables: {
      ServerAddress: "127.0.0.1",
      ServerPort: 5810,
      Subscriptions: [
        "/SmartDashboard",
        "/photonvision",
        "/FMSInfo",
        "/LiveWindow"
      ],
      Topics: {
        MatchTime: "/SmartDashboard/Robot/Game/MatchTime",
        RobotMode: "/SmartDashboard/Robot/Mode",
        RobotState: "/SmartDashboard/Robot/State",
        Alliance: "/SmartDashboard/Robot/Game/Alliance",
        StationNumber: "/SmartDashboard/Robot/Game/StationNumber",
        BatteryVoltage: "/SmartDashboard/Robot/Power/Battery/Voltage"
      }
    },
    CameraStreams: {
      Front: "http://10.28.81.6:1182/?action=stream",
      Rear: "http://10.28.81.6:1184/?action=stream",
      Side: "http://10.28.81.6:1186/?action=stream"
    },
    MatchTime: {
      Warning: 35,
      Critical: 10
    },
    BatteryVoltage: {
      Low: 12.25,
      Warning: 12.0,
      Critical: 11.75
    },
    Layout: {
      MaxWidth: 1920,
      MaxHeight: 1080,
      DockedHeight: 248
    }
  }
}
