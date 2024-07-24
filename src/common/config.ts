import type { ConfigurationSettings } from "./types.js";

export namespace Configuration {
  export const Settings: ConfigurationSettings = {
    NetworkTables: {
      ServerAddress: "10.28.81.2",
      ServerPort: 5810,
      Subscriptions: [
        "/SmartDashboard",
        "/FMSInfo",
        "/LiveWindow"
      ],
      Topics: {
        IsAllTelemetryEnabled: "/SmartDashboard/Robot/IsAllTelemetryEnabled",
        MatchTime: "/SmartDashboard/Robot/Game/MatchTime",
        RobotMode: "/SmartDashboard/Robot/Mode",
        RobotState: "/SmartDashboard/Robot/State",
        Alliance: "/SmartDashboard/Robot/Game/Alliance",
        Team: "/SmartDashboard/Robot/Game/Team",
        Station: "/SmartDashboard/Robot/Game/Station",
        AutoCommand: "/SmartDashboard/Robot/Auto/Command",
        HasInitialZeroResets: "/SmartDashboard/Robot/HasInitialZeroResets",
        IsGyroCalibrating: "/SmartDashboard/Robot/Sensor/Gyro/IsCalibrating",
        BatteryInfo: "/SmartDashboard/Robot/Power/Battery/Info",
        BatteryVoltage: "/SmartDashboard/Robot/Power/Battery/Voltage",
        FieldLength: "/SmartDashboard/Robot/Game/Field/Length",
        FieldWidth: "/SmartDashboard/Robot/Game/Field/Width",
        DriveLength: "/SmartDashboard/Robot/Drive/Chassis/Length",
        DriveWidth: "/SmartDashboard/Robot/Drive/Chassis/Width",
        DriveLockState: "/SmartDashboard/Robot/Drive/LockState",
        DriveOrientation: "/SmartDashboard/Robot/Drive/Orientation",
        DriveSpeedMode: "/SmartDashboard/Robot/Drive/SpeedMode",
        DriveDriftCorrection: "/SmartDashboard/Robot/Drive/DriftCorrection",
        DriveIdleMode: "/SmartDashboard/Robot/Drive/IdleMode",
        DriveIsAlignedToTarget: "/SmartDashboard/Robot/Drive/IsAlignedToTarget",
        DriveSwerveModuleFrontLeftDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModules/FrontLeft/Driving/Speed/Target",
        DriveSwerveModuleFrontLeftDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModules/FrontLeft/Driving/Speed/Actual",
        DriveSwerveModuleFrontLeftTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModules/FrontLeft/Turning/AbsolutePosition",
        DriveSwerveModuleFrontRightDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModules/FrontRight/Driving/Speed/Target",
        DriveSwerveModuleFrontRightDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModules/FrontRight/Driving/Speed/Actual",
        DriveSwerveModuleFrontRightTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModules/FrontRight/Turning/AbsolutePosition",
        DriveSwerveModuleRearLeftDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModules/RearLeft/Driving/Speed/Target",
        DriveSwerveModuleRearLeftDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModules/RearLeft/Driving/Speed/Actual",
        DriveSwerveModuleRearLeftTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModules/RearLeft/Turning/AbsolutePosition",
        DriveSwerveModuleRearRightDrivingSpeedTarget: "/SmartDashboard/Robot/Drive/SwerveModules/RearRight/Driving/Speed/Target",
        DriveSwerveModuleRearRightDrivingSpeedActual: "/SmartDashboard/Robot/Drive/SwerveModules/RearRight/Driving/Speed/Actual",
        DriveSwerveModuleRearRightTurningPosition: "/SmartDashboard/Robot/Drive/SwerveModules/RearRight/Turning/AbsolutePosition",
        RobotPose: "/SmartDashboard/Robot/Localization/Pose",
        RearPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Rear/HasTarget",
        RearPoseSensorTargetCount: "/SmartDashboard/Robot/Sensor/Pose/Rear/TargetCount",
        LeftPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Left/HasTarget",
        LeftPoseSensorTargetCount: "/SmartDashboard/Robot/Sensor/Pose/Left/TargetCount",
        RightPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Right/HasTarget",
        RightPoseSensorTargetCount: "/SmartDashboard/Robot/Sensor/Pose/Right/TargetCount",
        FrontNoteObjectSensorHasTarget: "/SmartDashboard/Robot/Sensor/Object/Front/Note/HasTarget",
        FrontNoteObjectSensorTargetHeading: "/SmartDashboard/Robot/Sensor/Object/Front/Note/Target/Heading",
        FrontNoteObjectSensorTargetArea: "/SmartDashboard/Robot/Sensor/Object/Front/Note/Target/Area",
        TargetDistance: "/SmartDashboard/Robot/Localization/Target/Distance",
        TargetHeading: "/SmartDashboard/Robot/Localization/Target/Heading",
        TargetPitch: "/SmartDashboard/Robot/Localization/Target/Pitch",
        IntakeSpeed: "/SmartDashboard/Robot/Intake/Speed",
        IntakeIsLoaded: "/SmartDashboard/Robot/Intake/IsLoaded",
        IntakeIsLaunchReady: "/SmartDashboard/Robot/Intake/IsLaunchReady",
        LauncherDistanceSensorHasTarget: "/SmartDashboard/Robot/Sensor/Distance/Launcher/HasTarget",
        LauncherDistanceSensorValue: "/SmartDashboard/Robot/Sensor/Distance/Launcher/Value",
        LauncherArmPositions: "/SmartDashboard/Robot/Launcher/Arm/Positions",
        LauncherArmPosition: "/SmartDashboard/Robot/Launcher/Arm/Position",
        LauncherArmIsAlignedToTarget: "/SmartDashboard/Robot/Launcher/Arm/IsAlignedToTarget",
        LauncherRollersTopSpeedDelta: "/SmartDashboard/Robot/Launcher/Rollers/Top/Speed/Delta",
        LauncherRollersBottomSpeedDelta: "/SmartDashboard/Robot/Launcher/Rollers/Bottom/Speed/Delta",
        LauncherRollersIsLaunchReady: "/SmartDashboard/Robot/Launcher/Rollers/IsLaunchReady"
      },
    },
    Cameras: {
      Robot: {
        Driver: "http://10.28.81.6:1188/?action=stream",
        Front: "http://10.28.81.6:1188/?action=stream",
        Rear: "http://10.28.81.6:1182/?action=stream",
        Left: "http://10.28.81.6:1186/?action=stream",
        Right: "http://10.28.81.6:1184/?action=stream"
      },
      DriverStation: "HD USB Camera"
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
