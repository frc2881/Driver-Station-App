export enum Platform {
  Windows = "win32",
  macOS = "darwin"
}

export enum AppWindowType {
  Hud = "HUD",
  Dashboard = "DASHBOARD",
  Data = "DATA"
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

export enum RobotMode {
  Disabled = "DISABLED",
  Auto = "AUTO",
  Teleop = "TELEOP",
  Test = "TEST"
}

export enum RobotStatus {
  Disabled = "DISABLED",
  Enabled = "ENABLED",
  Estopped = "ESTOPPED"
}

export enum Alliance {
  Red = "RED",
  Blue = "BLUE"
}

export enum CameraName {
  Front = "FRONT",
  Back = "BACK",
  Driver = "DRIVER"
}
