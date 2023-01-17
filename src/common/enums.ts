export enum Platform {
  Windows = "win32",
  macOS = "darwin"
}

export enum AppWindowType {
  HUD = "HUD",
  DASHBOARD = "DASHBOARD",
  DATA = "DATA"
}

export enum AppServerMessageType {
  NetworkTablesService
}

export enum NetworkTablesServiceMessageType {
  ConnectionChanged,
  TopicsUpdated
}

export enum NetworkTablesDataType {
  Any = -1,
  Boolean = 0,
  Double = 1,
  Integer = 2,
  Float = 3,
  String = 4,
  Binary = 5,
  BooleanArray = 16,
  DoubleArray = 17,
  IntegerArray = 18,
  FloatArray = 19,
  StringArray = 20
}
