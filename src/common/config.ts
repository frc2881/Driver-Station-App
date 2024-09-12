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
        BatteryInfo: "/SmartDashboard/Robot/Power/Battery/Info",
        BatteryVoltage: "/SmartDashboard/Robot/Power/Battery/Voltage",
        IsGyroCalibrating: "/SmartDashboard/Robot/Sensor/Gyro/IsCalibrating",
        FieldLength: "/SmartDashboard/Robot/Game/Field/Length",
        FieldWidth: "/SmartDashboard/Robot/Game/Field/Width",
        DriveLength: "/SmartDashboard/Robot/Drive/Chassis/Length",
        DriveWidth: "/SmartDashboard/Robot/Drive/Chassis/Width",
        DriveSpeedMax: "/SmartDashboard/Robot/Drive/Speed/Max",
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
        FrontPoseSensorIsConnected: "/SmartDashboard/Robot/Sensor/Pose/Front/IsConnected",
        FrontPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Front/HasTarget",
        FrontPoseSensorTargetCount: "/SmartDashboard/Robot/Sensor/Pose/Front/TargetCount",
        RearPoseSensorIsConnected: "/SmartDashboard/Robot/Sensor/Pose/Rear/IsConnected",
        RearPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Rear/HasTarget",
        RearPoseSensorTargetCount: "/SmartDashboard/Robot/Sensor/Pose/Rear/TargetCount",
        LeftPoseSensorIsConnected: "/SmartDashboard/Robot/Sensor/Pose/Left/IsConnected",
        LeftPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Left/HasTarget",
        LeftPoseSensorTargetCount: "/SmartDashboard/Robot/Sensor/Pose/Left/TargetCount",
        RightPoseSensorIsConnected: "/SmartDashboard/Robot/Sensor/Pose/Right/IsConnected",
        RightPoseSensorHasTarget: "/SmartDashboard/Robot/Sensor/Pose/Right/HasTarget",
        RightPoseSensorTargetCount: "/SmartDashboard/Robot/Sensor/Pose/Right/TargetCount",
        CameraStreams: "/SmartDashboard/Robot/Sensor/Camera/Streams",
        TargetDistance: "/SmartDashboard/Robot/Localization/Target/Distance",
        TargetHeading: "/SmartDashboard/Robot/Localization/Target/Heading",
        TargetPitch: "/SmartDashboard/Robot/Localization/Target/Pitch"
      },
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
