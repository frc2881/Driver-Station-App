import type { ConfigurationSettings } from "./types.js";
import { Topic } from "./enums.js";

export namespace Configuration {
  export const Settings: ConfigurationSettings = {
    NetworkTables: {
      ServerAddress: "10.28.81.2",
      ServerPort: 5810,
      Subscriptions: [
        "/SmartDashboard"
      ],
      Topics: {
        [Topic.IsAllTelemetryEnabled]: "/SmartDashboard/Robot/IsAllTelemetryEnabled",
        [Topic.MatchTime]: "/SmartDashboard/Robot/Game/MatchTime",
        [Topic.RobotMode]: "/SmartDashboard/Robot/Mode",
        [Topic.RobotState]: "/SmartDashboard/Robot/State",
        [Topic.Alliance]: "/SmartDashboard/Robot/Game/Alliance",
        [Topic.Team]: "/SmartDashboard/Robot/Game/Team",
        [Topic.Station]: "/SmartDashboard/Robot/Game/Station",
        [Topic.AutoCommand]: "/SmartDashboard/Robot/Auto/Command",
        [Topic.BatteryInfo]: "/SmartDashboard/Robot/Power/Battery/Info",
        [Topic.BatteryVoltage]: "/SmartDashboard/Robot/Power/Battery/Voltage",
        [Topic.IsGyroCalibrating]: "/SmartDashboard/Robot/Sensors/Gyro/IsCalibrating",
        [Topic.FieldLength]: "/SmartDashboard/Robot/Game/Field/Length",
        [Topic.FieldWidth]: "/SmartDashboard/Robot/Game/Field/Width",
        [Topic.DriveLength]: "/SmartDashboard/Robot/Drive/Chassis/Length",
        [Topic.DriveWidth]: "/SmartDashboard/Robot/Drive/Chassis/Width",
        [Topic.DriveSpeedMax]: "/SmartDashboard/Robot/Drive/Speed/Max",
        [Topic.DriveLockState]: "/SmartDashboard/Robot/Drive/LockState",
        [Topic.DriveOrientation]: "/SmartDashboard/Robot/Drive/Orientation",
        [Topic.DriveSpeedMode]: "/SmartDashboard/Robot/Drive/SpeedMode",
        [Topic.DriveDriftCorrection]: "/SmartDashboard/Robot/Drive/DriftCorrection",
        [Topic.DriveIdleMode]: "/SmartDashboard/Robot/Drive/IdleMode",
        [Topic.DriveIsAlignedToTarget]: "/SmartDashboard/Robot/Drive/IsAlignedToTarget",
        [Topic.DriveSwerveModuleFrontLeftDrivingSpeedTarget]: "/SmartDashboard/Robot/Drive/Modules/FrontLeft/Driving/Speed/Target",
        [Topic.DriveSwerveModuleFrontLeftDrivingSpeedActual]: "/SmartDashboard/Robot/Drive/Modules/FrontLeft/Driving/Speed/Actual",
        [Topic.DriveSwerveModuleFrontLeftTurningPosition]: "/SmartDashboard/Robot/Drive/Modules/FrontLeft/Turning/Position",
        [Topic.DriveSwerveModuleFrontRightDrivingSpeedTarget]: "/SmartDashboard/Robot/Drive/Modules/FrontRight/Driving/Speed/Target",
        [Topic.DriveSwerveModuleFrontRightDrivingSpeedActual]: "/SmartDashboard/Robot/Drive/Modules/FrontRight/Driving/Speed/Actual",
        [Topic.DriveSwerveModuleFrontRightTurningPosition]: "/SmartDashboard/Robot/Drive/Modules/FrontRight/Turning/Position",
        [Topic.DriveSwerveModuleRearLeftDrivingSpeedTarget]: "/SmartDashboard/Robot/Drive/Modules/RearLeft/Driving/Speed/Target",
        [Topic.DriveSwerveModuleRearLeftDrivingSpeedActual]: "/SmartDashboard/Robot/Drive/Modules/RearLeft/Driving/Speed/Actual",
        [Topic.DriveSwerveModuleRearLeftTurningPosition]: "/SmartDashboard/Robot/Drive/Modules/RearLeft/Turning/Position",
        [Topic.DriveSwerveModuleRearRightDrivingSpeedTarget]: "/SmartDashboard/Robot/Drive/Modules/RearRight/Driving/Speed/Target",
        [Topic.DriveSwerveModuleRearRightDrivingSpeedActual]: "/SmartDashboard/Robot/Drive/Modules/RearRight/Driving/Speed/Actual",
        [Topic.DriveSwerveModuleRearRightTurningPosition]: "/SmartDashboard/Robot/Drive/Modules/RearRight/Turning/Position",
        [Topic.RobotPose]: "/SmartDashboard/Robot/Localization/Pose",
        [Topic.FrontPoseSensorIsConnected]: "/SmartDashboard/Robot/Sensors/Pose/Front/IsConnected",
        [Topic.FrontPoseSensorHasTarget]: "/SmartDashboard/Robot/Sensors/Pose/Front/HasTarget",
        [Topic.FrontPoseSensorTargetCount]: "/SmartDashboard/Robot/Sensors/Pose/Front/TargetCount",
        [Topic.RearPoseSensorIsConnected]: "/SmartDashboard/Robot/Sensors/Pose/Rear/IsConnected",
        [Topic.RearPoseSensorHasTarget]: "/SmartDashboard/Robot/Sensors/Pose/Rear/HasTarget",
        [Topic.RearPoseSensorTargetCount]: "/SmartDashboard/Robot/Sensors/Pose/Rear/TargetCount",
        [Topic.LeftPoseSensorIsConnected]: "/SmartDashboard/Robot/Sensors/Pose/Left/IsConnected",
        [Topic.LeftPoseSensorHasTarget]: "/SmartDashboard/Robot/Sensors/Pose/Left/HasTarget",
        [Topic.LeftPoseSensorTargetCount]: "/SmartDashboard/Robot/Sensors/Pose/Left/TargetCount",
        [Topic.RightPoseSensorIsConnected]: "/SmartDashboard/Robot/Sensors/Pose/Right/IsConnected",
        [Topic.RightPoseSensorHasTarget]: "/SmartDashboard/Robot/Sensors/Pose/Right/HasTarget",
        [Topic.RightPoseSensorTargetCount]: "/SmartDashboard/Robot/Sensors/Pose/Right/TargetCount",
        [Topic.CameraStreams]: "/SmartDashboard/Robot/Sensors/Camera/Streams"
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
