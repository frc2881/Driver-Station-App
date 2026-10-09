export enum RobotMode {
  Disabled = "DISABLED",
  Auto = "AUTO",
  Teleop = "TELELOP",
  Test = "TEST"
}

export enum RobotState {
  Disabled = "DISABLED",
  Enabled = "ENABLED",
  Estopped = "ESTOPPED"
}

export enum RobotType {
  Other = "OTHER",
  Competition = "COMPETITION",
  Practice = "PRACTICE",
  Demo = "DEMO"
}

export enum Alliance {
  Red = "RED",
  Blue = "BLUE",
  None = "None"
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
