import { ConfigurationSettings } from "./common";

export namespace Configuration {
  export const Settings: ConfigurationSettings = {
    NetworkTables: {
      ServerAddress: "10.28.81.2",
      ServerPort: 5810,
      Subscriptions: [
        "/SmartDashboard",
        //"/photonvision",
        "/FMSInfo",
        "/LiveWindow"
      ],
      Topics: {
        IsAllTelemetryEnabled: "/SmartDashboard/Robot/IsAllTelemetryEnabled",
        MatchTime: "/SmartDashboard/Robot/Game/MatchTime",
        RobotMode: "/SmartDashboard/Robot/Mode",
        RobotState: "/SmartDashboard/Robot/State",
        HasInitialReset: "/SmartDashboard/Robot/HasInitialReset",
        Alliance: "/SmartDashboard/Robot/Game/Alliance",
        StationNumber: "/SmartDashboard/Robot/Game/StationNumber",
        BatteryInfo: "/SmartDashboard/Robot/Power/Battery/Info",
        BatteryVoltage: "/SmartDashboard/Robot/Power/Battery/Voltage",
        TotalCurrent: "/SmartDashboard/Robot/Power/TotalCurrent",
        AutoCommand: "/SmartDashboard/Robot/Auto/Command",
        DriveLockState: "/SmartDashboard/Robot/Drive/LockState",
        DriveOrientation: "/SmartDashboard/Robot/Drive/Orientation",
        DriveSpeedMode: "/SmartDashboard/Robot/Drive/SpeedMode",
        DriveDriftCorrection: "/SmartDashboard/Robot/Drive/DriftCorrection",
        DriveIsAlignedToTarget: "/SmartDashboard/Robot/Drive/IsAlignedToTarget",
        DriveSwerveModuleFrontLeftDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModule/FrontLeft/Driving/Speed/Target",
        DriveSwerveModuleFrontLeftDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModule/FrontLeft/Driving/Speed/Actual",
        DriveSwerveModuleFrontLeftTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModule/FrontLeft/Turning/Position",
        DriveSwerveModuleFrontRightDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModule/FrontRight/Driving/Speed/Target",
        DriveSwerveModuleFrontRightDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModule/FrontRight/Driving/Speed/Actual",
        DriveSwerveModuleFrontRightTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModule/FrontRight/Turning/Position",
        DriveSwerveModuleRearLeftDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModule/RearLeft/Driving/Speed/Target",
        DriveSwerveModuleRearLeftDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModule/RearLeft/Driving/Speed/Actual",
        DriveSwerveModuleRearLeftTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModule/RearLeft/Turning/Position",
        DriveSwerveModuleRearRightDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModule/RearRight/Driving/Speed/Target",
        DriveSwerveModuleRearRightDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModule/RearRight/Driving/Speed/Actual",
        DriveSwerveModuleRearRightTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModule/RearRight/Turning/Position",
        RobotPose: "/SmartDashboard/Robot/Pose",
        TargetPose: "/SmartDashboard/Robot/Pose/Target/Pose",
        TargetYaw: "/SmartDashboard/Robot/Pose/Target/Yaw",
        TargetPitch: "/SmartDashboard/Robot/Pose/Target/Pitch",
        TargetDistance: "/SmartDashboard/Robot/Pose/Target/Distance",
        RearPoseSensorHasTargets: "/SmartDashboard/Robot/Sensor/Pose/Rear/HasTargets",
        SidePoseSensorHasTargets: "/SmartDashboard/Robot/Sensor/Pose/Side/HasTargets",
        FrontNoteObjectSensorHasTarget: "/SmartDashboard/Robot/Sensor/Object/Front/Note/HasTarget",
        FrontNoteObjectSensorTargetYaw: "/SmartDashboard/Robot/Sensor/Object/Front/Note/Target/Yaw",
        FrontNoteObjectSensorTargetArea: "/SmartDashboard/Robot/Sensor/Object/Front/Note/Target/Area",
        LauncherBottomBeamBreakSensorHasTarget: "/SmartDashboard/Robot/Sensor/BeamBreak/LauncherBottom/HasTarget",
        LauncherTopBeamBreakSensorHasTarget: "/SmartDashboard/Robot/Sensor/BeamBreak/LauncherTop/HasTarget",
        LauncherArmPosition: "/SmartDashboard/Robot/Launcher/Arm/Position",
        LauncherArmIsAlignedToTarget: "/SmartDashboard/Robot/Launcher/Arm/IsAlignedToTarget",
        LauncherArmPositions: "/SmartDashboard/Robot/Launcher/Arm/Positions",
        LauncherRollerTopSpeed: "/SmartDashboard/Robot/Launcher/Roller/Top/Speed",
        LauncherRollerBottomSpeed: "/SmartDashboard/Robot/Launcher/Roller/Bottom/Speed",
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
