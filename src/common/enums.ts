export enum RobotMode {
  Disabled = "Disabled",
  Auto = "Auto",
  Teleop = "Teleop",
  Test = "Test"
}

export enum RobotState {
  Disabled = "Disabled",
  Enabled = "Enabled",
  Estopped = "EStopped"
}

export enum Alliance {
  Red = "Red",
  Blue = "Blue"
}

export enum AppWindowType {
  Hud = "Hud",
  Dashboard = "Dashboard",
  Data = "Data"
}

export enum AppServerMessageType {
  NetworkTablesService
}

export enum NetworkTablesServiceMessageType {
  ConnectionChanged,
  TopicsUpdated,
  TopicsRemoved
}

export enum NetworkTablesDataType {
  Boolean = 0,
  Double = 1,
  Integer = 2,
  Float = 3,
  String = 4,
  Raw = 5,
  BooleanArray = 16,
  DoubleArray = 17,
  IntegerArray = 18,
  FloatArray = 19,
  StringArray = 20
}

export enum Topic {
  IsAllTelemetryEnabled,
  MatchTime,
  RobotMode,
  RobotState,
  Alliance,
  Team,
  Station,
  AutoCommand,
  BatteryInfo,
  BatteryVoltage,
  IsGyroCalibrating,
  FieldLength,
  FieldWidth,
  DriveLength,
  DriveWidth,
  DriveSpeedMax,
  DriveLockState,
  DriveOrientation,
  DriveSpeedMode,
  DriveDriftCorrection,
  DriveIdleMode,
  DriveIsAlignedToTarget,
  DriveSwerveModuleFrontLeftDrivingSpeedTarget,
  DriveSwerveModuleFrontLeftDrivingSpeedActual,
  DriveSwerveModuleFrontLeftTurningPosition,
  DriveSwerveModuleFrontRightDrivingSpeedTarget,
  DriveSwerveModuleFrontRightDrivingSpeedActual,
  DriveSwerveModuleFrontRightTurningPosition,
  DriveSwerveModuleRearLeftDrivingSpeedTarget,
  DriveSwerveModuleRearLeftDrivingSpeedActual,
  DriveSwerveModuleRearLeftTurningPosition,
  DriveSwerveModuleRearRightDrivingSpeedTarget,
  DriveSwerveModuleRearRightDrivingSpeedActual,
  DriveSwerveModuleRearRightTurningPosition,
  RobotPose,
  FrontPoseSensorIsConnected,
  FrontPoseSensorHasTarget,
  FrontPoseSensorTargetCount,
  RearPoseSensorIsConnected,
  RearPoseSensorHasTarget,
  RearPoseSensorTargetCount,
  LeftPoseSensorIsConnected,
  LeftPoseSensorHasTarget,
  LeftPoseSensorTargetCount,
  RightPoseSensorIsConnected,
  RightPoseSensorHasTarget,
  RightPoseSensorTargetCount,
  CameraStreams,
  TargetDistance,
  TargetHeading,
  TargetPitch
}
