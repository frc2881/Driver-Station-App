<script lang="ts">
  import { Tile, InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { NetworkTables } from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import RobotInfo from "../components/Dashboard/RobotInfo.svelte";
  import GameInfo from "../components/Dashboard/GameInfo.svelte";
  import BatteryInfo from "../components/Dashboard/BatteryInfo.svelte";
  import PoseInfo from "../components/Dashboard/PoseInfo.svelte";
  import DriveSettings from "../components/Dashboard/DriveSettings.svelte";
  import AutoSettings from "../components/Dashboard/AutoSettings.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;

  let nt: NetworkTables = $NetworkTablesStore;
  $: { nt = $NetworkTablesStore; }

  const toggleControllerMap = (target: EventTarget): void => {
    if (!document.fullscreenElement) {
      (target as HTMLElement).requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
</script>

<main>
{ #if nt.isConnected }
  <div class="info">
    <div class="left">
      <RobotInfo 
        mode={ nt.topics.get(Topics.RobotMode)?.value } 
        state={ nt.topics.get(Topics.RobotState)?.value } />
    </div>
    <div class="center">
      <GameInfo 
        alliance={ nt.topics.get(Topics.Alliance)?.value } 
        stationNumber={ nt.topics.get(Topics.StationNumber)?.value } />
    </div>
    <div class="right">
      <BatteryInfo 
        voltage={ nt.topics.get(Topics.BatteryVoltage)?.value } />
    </div>
  </div>
  <div class="widgets">
    <Tile class="widget">
    </Tile>
    <Tile class="widget">
      <PoseInfo 
        rearSensorHasTargetsTopic={ nt.topics.get("/SmartDashboard/Robot/Sensor/Pose/Rear/HasTargets") }
        sideSensorHasTargetsTopic={ nt.topics.get("/SmartDashboard/Robot/Sensor/Pose/Side/HasTargets") }
        frontSensorHasTargetsTopic={ nt.topics.get("/SmartDashboard/Robot/Sensor/Pose/Front/HasTargets") }
        poseTopic={ nt.topics.get("/SmartDashboard/Robot/Pose") }
      />         
    </Tile>
    <Tile class="widget">
      <AutoSettings />
    </Tile>
    <Tile class="widget">
    </Tile>
    <Tile class="widget">
      <DriveSettings />
    </Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget">
      <!-- <div 
        style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#000000;"
        on:click={ (e) => { toggleControllerMap(e.target); } }
        on:keypress={ (e) => { toggleControllerMap(e.target); } }>
        <img 
          src="./assets/controller-map-manipulator.png" 
          style="width:80%;cursor:pointer;filter:invert(1);"
          alt="Manipulator Controller Map"
        />
      </div> -->
    </Tile>
  </div>
{ :else }
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ nt.address } ...`}
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
    
    .info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 90px;
      padding: 0 20px;

      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1.25em;
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
      postion: relative;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 350px;
      column-gap: 20px;
      row-gap: 20px;
      padding: 0 20px 20px 20px;

      :global {
        .widget {
          padding: 2em;
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