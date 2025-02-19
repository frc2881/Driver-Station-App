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
  Dashboard = "Dashboard"
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
