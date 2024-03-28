<script lang="ts">
  import { Tile, InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { NetworkTables } from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import RobotInfo from "../components/Dashboard/RobotInfo.svelte";
  import GameInfo from "../components/Dashboard/GameInfo.svelte";
  import PowerInfo from "../components/Dashboard/PowerInfo.svelte";
  import Settings from "../components/Dashboard/Settings.svelte";
  import DriveInfo from "../components/Dashboard/DriveInfo.svelte";
  import PoseInfo from "../components/Dashboard/PoseInfo.svelte";
  import ResetStatus from "../components/Dashboard/ResetStatus.svelte";
  import AutoSettings from "../components/Dashboard/AutoSettings.svelte";
  import TargetingData from "../components/Dashboard/TargetingData.svelte";
  import ControllerMap from "../components/Dashboard/ControllerMap.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;
  let nt: NetworkTables = $NetworkTablesStore;
  $: { nt = $NetworkTablesStore; }

  let isControllerMapVisible: boolean = false;
</script>

<main>
{ #if nt.isConnected }
  <div class="info">
    <div class="left">
      <RobotInfo 
        mode={ nt.topics.get(Topics.RobotMode)?.value } 
        state={ nt.topics.get(Topics.RobotState)?.value } />
      <GameInfo 
        alliance={ nt.topics.get(Topics.Alliance)?.value } 
        stationNumber={ nt.topics.get(Topics.StationNumber)?.value } />
    </div>
    <div class="center">
      <div class="controller-map-button">
        <button on:click={ () => { isControllerMapVisible = true; } }>
          <img src="./assets/controller.png" alt="Controller Map" />
        </button>
      </div>
    </div>
    <div class="right">
      <PowerInfo 
        batteryInfo={ nt.topics.get(Topics.BatteryInfo)?.value }
        batteryVoltage={ nt.topics.get(Topics.BatteryVoltage)?.value }
        totalCurrent={ nt.topics.get(Topics.TotalCurrent)?.value } />
    </div>
  </div>
  <div class="widgets">
    <Tile class="widget row-span-2">
      <Settings />
    </Tile>
    <Tile class="widget">
      <DriveInfo
        swerveModuleFrontLeftDrivingSpeedTarget={ nt.topics.get(Topics.DriveSwerveModuleFrontLeftDrivingSpeedTarget)?.value }
        swerveModuleFrontLeftDrivingSpeedActual={ nt.topics.get(Topics.DriveSwerveModuleFrontLeftDrivingSpeedActual)?.value }
        swerveModuleFrontLeftTurningPosition={ nt.topics.get(Topics.DriveSwerveModuleFrontLeftTurningPosition)?.value } 
        swerveModuleFrontRightDrivingSpeedTarget={ nt.topics.get(Topics.DriveSwerveModuleFrontRightDrivingSpeedTarget)?.value }
        swerveModuleFrontRightDrivingSpeedActual={ nt.topics.get(Topics.DriveSwerveModuleFrontRightDrivingSpeedActual)?.value }
        swerveModuleFrontRightTurningPosition={ nt.topics.get(Topics.DriveSwerveModuleFrontRightTurningPosition)?.value } 
        swerveModuleRearLeftDrivingSpeedTarget={ nt.topics.get(Topics.DriveSwerveModuleRearLeftDrivingSpeedTarget)?.value }
        swerveModuleRearLeftDrivingSpeedActual={ nt.topics.get(Topics.DriveSwerveModuleRearLeftDrivingSpeedActual)?.value }
        swerveModuleRearLeftTurningPosition={ nt.topics.get(Topics.DriveSwerveModuleRearLeftTurningPosition)?.value } 
        swerveModuleRearRightDrivingSpeedTarget={ nt.topics.get(Topics.DriveSwerveModuleRearRightDrivingSpeedTarget)?.value }
        swerveModuleRearRightDrivingSpeedActual={ nt.topics.get(Topics.DriveSwerveModuleRearRightDrivingSpeedActual)?.value }
        swerveModuleRearRightTurningPosition={ nt.topics.get(Topics.DriveSwerveModuleRearRightTurningPosition)?.value } />
    </Tile>
    <Tile class="widget">
      <ResetStatus 
        hasInitialReset={ nt.topics.get(Topics.HasInitialReset)?.value } />
    </Tile>
    <Tile class="widget row-span-2">
      <AutoSettings
        alliance={ nt.topics.get(Topics.Alliance)?.value } />
    </Tile>
    <Tile class="widget">
      <PoseInfo 
        robotPose={ nt.topics.get(Topics.RobotPose)?.value }
        rearPoseSensorHasTargets={ nt.topics.get(Topics.RearPoseSensorHasTargets)?.value }
        sidePoseSensorHasTargets={ nt.topics.get(Topics.SidePoseSensorHasTargets)?.value }
        frontNoteObjectSensorHasTarget={ nt.topics.get(Topics.FrontNoteObjectSensorHasTarget)?.value }
        targetYaw={ nt.topics.get(Topics.TargetYaw)?.value }
        targetDistance={ nt.topics.get(Topics.TargetDistance)?.value } /> 
    </Tile>
    <Tile class="widget">
      <TargetingData
        launcherArmPositions={ nt.topics.get(Topics.LauncherArmPositions)?.value } />
    </Tile>
    <ControllerMap 
      bind:isControllerMapVisible={ isControllerMapVisible } />
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

      .controller-map-button {
        button {
          margin: 6px 0 0 0;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;

          img {
            height: 42px;
          }
        }
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

          &.row-span-2 {
            grid-row: span 2;
          }

          .title {
            margin-bottom: 1.5em;
            border-bottom: 1px solid var(--app-color-charcoal);
            padding: 0px 3px;
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