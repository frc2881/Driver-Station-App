<script lang="ts">
  import { 
    Tile, 
    InlineNotification, 
    SkeletonPlaceholder 
  } from "carbon-components-svelte";
  import { NetworkTables } from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import RobotInfo from "../components/Dashboard/RobotInfo.svelte";
  import AllianceInfo from "../components/Dashboard/AllianceInfo.svelte";
  import BatteryInfo from "../components/Dashboard/BatteryInfo.svelte";
  import SendableChooser from "../components/SendableChooser.svelte";
  import VisionInfo from "../components/Dashboard/VisionInfo.svelte";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }
</script>

<main>
{ #if networkTables.isConnected }
  <div class="info">
    <div class="left">
      <RobotInfo 
        mode={ networkTables.topics.get("/SmartDashboard/Robot/Mode") }
        status={ networkTables.topics.get("/SmartDashboard/Robot/Status") }/>
    </div>
    <div class="center">
      <AllianceInfo 
        isRedAlliance={ networkTables.topics.get("/FMSInfo/IsRedAlliance") }
        stationNumber={ networkTables.topics.get("/FMSInfo/StationNumber") } />
    </div>
    <div class="right">
      <BatteryInfo voltage={ networkTables.topics.get("/SmartDashboard/Robot/BatteryVoltage") } />
    </div>
  </div>
  <div class="widgets">
    <Tile class="widget">      
      <SendableChooser
        name="Auto Command"
        options={ networkTables.topics.get("/SmartDashboard/Auto/Command/options") }
        active={ networkTables.topics.get("/SmartDashboard/Auto/Command/active") } />
    </Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget">
      <VisionInfo 
        photonVisionLeftCameraHasTarget={ networkTables.topics.get("/photonvision/LEFT/hasTarget") }
        photonVisionRightCameraHasTarget={ networkTables.topics.get("/photonvision/RIGHT/hasTarget") }
        robotPose={ networkTables.topics.get("/SmartDashboard/Drive/Pose") }
      />
    </Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
  </div>
{ :else }
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ networkTables.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton />
  </div>
  <div class="watermark"><SkeletonPlaceholder class="skeleton" /><svg class="icon"><use xlink:href="#iconRobot"/></svg></div>
{ /if }
</main>

<style lang="postcss">
  main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    
    .info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 100px;
      padding: 0 20px;

      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .center {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    .widgets {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 350px;
      column-gap: 20px;
      row-gap: 20px;
      padding: 0 20px 20px 20px;

      :global {
        .widget {
          padding: 2em;

          .main {
            display: grid;
            grid-template-rows: 50px auto;
            width: 100%;
            height: 100%;

            .title {
              color: var(--app-color-smoke);
            }
          }
        }
      }
    }
  }

  .inlineNotification {
    padding: .75em 2em;
  }

  .watermark {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-128px, -128px);

    :global {
      .skeleton {
        position: absolute;
        width: 256px;
        height: 256px;
      }
    }

    .icon {
      position: absolute;
      width: 256px;
      height: 256px;
      fill: var(--app-color-pink);
    }
  }
</style>