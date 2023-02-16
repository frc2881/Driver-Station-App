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
    WINDOW_MAX_WIDTH: 1920,
    WINDOW_MAX_HEIGHT: 1080,
    FRC_DS_APP_DOCKED_HEIGHT: 240
  } as ConfigurationSettings
}