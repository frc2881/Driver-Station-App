import { ConfigurationSettings } from "./types";
import { CameraName } from "./enums";

export namespace Configuration {
  export const Settings = {
    Defaults: {
      NT_SERVER_ADDRESS: "10.28.81.2",
      NT_VERSION: 4
    },
    APP_SERVER_PORT: 2881,
    NT3_SERVER_PORT: 1882,
    NT4_SERVER_PORT: 5810,
    WINDOW_MAX_WIDTH: 1920,
    WINDOW_MAX_HEIGHT: 1080,
    FRC_DS_APP_DOCKED_HEIGHT: 240,
    FPGA_TIMESTAMP_TOPIC_NAME: "/SmartDashboard/Timing/FPGATimestamp",
    SUBSCRIPTIONS: [
      "/SmartDashboard",
      "/photonvision",
      "/CameraPublisher",
      "/FMSInfo",
      "/LiveWindow"
    ],
    CAMERA_STREAMS: {
      [CameraName.Left]: "http://10.28.81.18:1183/?action=stream",
      [CameraName.Right]: "http://10.28.81.18:1185/?action=stream"
    },
    MATCH_TIME_TRIGGERS: {
      WARNING: 35,
      CRITICAL: 10
    }
  } as ConfigurationSettings
}