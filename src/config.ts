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
        BatteryInfo: "/SmartDashboard/Robot/Power/Battery/Info",
        BatteryVoltage: "/SmartDashboard/Robot/Power/Battery/Voltage",
        TotalCurrent: "/SmartDashboard/Robot/Power/TotalCurrent",
        AutoCommand: "/SmartDashboard/Robot/Auto/Command",
        DriveLockState: "/SmartDashboard/Robot/Drive/LockState",
        DriveIdleMode: "/SmartDashboard/Robot/Drive/IdleMode",
        DriveOrientation: "/SmartDashboard/Robot/Drive/Orientation",
        DriveSpeedMode: "/SmartDashboard/Robot/Drive/SpeedMode",
        DriveDriftCorrection: "/SmartDashboard/Robot/Drive/DriftCorrection",
        RobotPose: "/SmartDashboard/Robot/Pose",
        TargetPose: "/SmartDashboard/Robot/Pose/Target/Pose",
        TargetYaw: "/SmartDashboard/Robot/Pose/Target/Yaw",
        TargetPitch: "/SmartDashboard/Robot/Pose/Target/Pitch",
        RearPoseSensorHasTargets: "/SmartDashboard/Robot/Sensor/Pose/Rear/HasTargets",
        SidePoseSensorHasTargets: "/SmartDashboard/Robot/Sensor/Pose/Side/HasTargets",
        FrontNoteObjectSensorHasTarget: "/SmartDashboard/Robot/Sensor/Object/Front/Note/HasTarget",
        IntakeBeamBreakSensorHasTarget: "/SmartDashboard/Robot/Sensor/BreamBreak/Intake/HasTarget",
        LauncherBottomBeamBreakSensorHasTarget: "/SmartDashboard/Robot/Sensor/BreamBreak/LauncherBottom/HasTarget",
        LauncherTopBeamBreakSensorHasTarget: "/SmartDashboard/Robot/Sensor/BreamBreak/LauncherTop/HasTarget",
        LauncherArmPosition: "/SmartDashboard/Robot/Launcher/Arm/Position",
        LauncherRollerTopSpeed: "/SmartDashboard/Robot/Launcher/Roller/Top/Speed",
        LauncherRollerBottomSpeed: "/SmartDashboard/Robot/Launcher/Roller/Bottom/Speed",
        IntakeBeltTopSpeed: "/SmartDashboard/Robot/Intake/Belt/Top/Speed",
        IntakeBeltBottomSpeed: "/SmartDashboard/Robot/Intake/Belt/Bottom/Speed",
        IntakeRollerSpeed: "/SmartDashboard/Robot/Intake/Roller/Speed"
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
    BatteryVoltageLevel: {
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
