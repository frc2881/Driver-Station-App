export enum AppWindowType {
  HUD = "HUD",
  DASHBOARD = "DASHBOARD",
  DATA = "DATA"
}

export enum ServerMessageType {
  NetworkTablesService
}

export enum NetworkTablesServiceMessageType {
  ConnectionChanged,
  TopicsUpdated
}

export enum NetworkTablesDataType {
  any = -1,
  boolean = 0,
  double = 1,
  integer = 2,
  float = 3,
  string = 4,
  binary = 5,
  booleanArray = 16,
  doubleArray = 17,
  integerArray = 18,
  floatArray = 19,
  stringArray = 20
}