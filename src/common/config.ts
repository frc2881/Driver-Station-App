import type { ConfigurationSettings } from "./types.js";

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
        AutoCommand: "/SmartDashboard/Robot/Auto/Command",
        HasInitialZeroResets: "/SmartDashboard/Robot/HasInitialZeroResets",
        IsGyroCalibrating: "/SmartDashboard/Robot/Sensor/Gyro/IsCalibrating",
        BatteryInfo: "/SmartDashboard/Robot/Power/Battery/Info",
        BatteryVoltage: "/SmartDashboard/Robot/Power/Battery/Voltage",
        TotalCurrent: "/SmartDashboard/Robot/Power/TotalCurrent",
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
        TargetYaw: "/SmartDashboard/Robot/Localization/Target/Yaw",
        TargetPitch: "/SmartDashboard/Robot/Localization/Target/Pitch",
        TargetDistance: "/SmartDashboard/Robot/Localization/Target/Distance",
        RearPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Rear/HasTarget",
        LeftPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Left/HasTarget",
        RightPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Right/HasTarget",
        FrontNoteObjectSensorHasTarget: "/SmartDashboard/Robot/Sensor/Object/Front/Note/HasTarget",
        FrontNoteObjectSensorTargetYaw: "/SmartDashboard/Robot/Sensor/Object/Front/Note/Target/Yaw",
        FrontNoteObjectSensorTargetArea: "/SmartDashboard/Robot/Sensor/Object/Front/Note/Target/Area",
        IntakeSpeed: "/SmartDashboard/Robot/Intake/Belts/Speed",
        IntakeIsLaunchReady: "/SmartDashboard/Robot/Intake/IsLaunchReady",
        IntakeDistanceSensorHasTarget: "/SmartDashboard/Robot/Sensor/Distance/Intake/HasTarget",
        LauncherDistanceSensorHasTarget: "/SmartDashboard/Robot/Sensor/Distance/Launcher/HasTarget",
        LauncherDistanceSensorValue: "/SmartDashboard/Robot/Sensor/Distance/Launcher/Value",
        LauncherArmPositions: "/SmartDashboard/Robot/Launcher/Arm/Positions",
        LauncherArmPosition: "/SmartDashboard/Robot/Launcher/Arm/Position",
        LauncherArmIsAlignedToTarget: "/SmartDashboard/Robot/Launcher/Arm/IsAlignedToTarget"
      },
    },
    Cameras: {
      Robot: {
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
