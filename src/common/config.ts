import { ConfigurationSettings } from "./types";

export namespace Configuration {
  export const Settings = {
    Defaults: {
      NT_SERVER_ADDRESS: "10.28.81.2",
      NT_VERSION: 4
    },
    APP_SERVER_PORT: 2881,
    NT3_SERVER_PORT: 1882,
    NT4_SERVER_PORT: 5810,
    FPGA_TIMESTAMP_TOPIC_NAME: "/SmartDashboard/Timing/FPGATimestamp",
    SUBSCRIPTIONS: [
      "/SmartDashboard", 
      "/FMSInfo",
      "/LiveWindow",
      "/photonvision"
    ],
    FRC_DRIVER_STATION_APP_DOCKED_HEIGHT: 240
  } as ConfigurationSettings
}