import { ConfigurationSettings } from "./common";

export namespace Configuration {
  export const Settings: ConfigurationSettings = {
    NetworkTables: {
      ServerAddress: "10.28.81.2",
      ServerPort: 5810,
      Subscriptions: [
        "/SmartDashboard",
        "/photonvision",
        "/FMSInfo",
        "/LiveWindow"
      ],
      Topics: {
        IsAllTelemetryEnabled: "/SmartDashboard/Robot/IsAllTelemetryEnabled",
        MatchTime: "/SmartDashboard/Robot/Game/MatchTime",
        RobotMode: "/SmartDashboard/Robot/Mode",
        RobotState: "/SmartDashboard/Robot/State",
        Alliance: "/SmartDashboard/Robot/Game/Alliance",
        StationNumber: "/SmartDashboard/Robot/Game/StationNumber",
        BatteryVoltage: "/SmartDashboard/Robot/Power/Battery/Voltage",
        RobotPose: "/SmartDashboard/Robot/Pose",
        AutoCommand: "/SmartDashboard/Robot/Auto/Command",
        DriveOrientation: "/SmartDashboard/Robot/Drive/Orientation",
        DriveSpeedMode: "/SmartDashboard/Robot/Drive/SpeedMode",
        DriveDriftCorrection: "/SmartDashboard/Robot/Drive/DriftCorrection",
        RearPoseSensorHasTargets: "/SmartDashboard/Robot/Sensor/Pose/Rear/HasTargets",
        SidePoseSensorHasTargets: "/SmartDashboard/Robot/Sensor/Pose/Side/HasTargets",
        FrontNoteObjectSensorHasTarget: "/SmartDashboard/Robot/Sensor/Object/Front/Note/HasTarget"
      },
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
      Low: 12.3,
      Warning: 12.1,
      Critical: 11.9
    },
    Layout: {
      MaxWidth: 1920,
      MaxHeight: 1080,
      DockedHeight: 248
    }
  }
}
