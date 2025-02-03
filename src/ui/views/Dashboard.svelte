<script lang="ts">
  import { Tile, InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { DataTable } from "carbon-icons-svelte";
  import { Configuration, Topic } from "../../common/index.js";
  import { NetworkTablesService as nt } from "../services/NetworkTables.svelte";
  import RobotInfo from "../components/Dashboard/RobotInfo.svelte";
  import GameInfo from "../components/Dashboard/GameInfo.svelte";
  import PowerInfo from "../components/Dashboard/PowerInfo.svelte";
  import Settings from "../components/Dashboard/Settings.svelte";
  import DriveInfo from "../components/Dashboard/DriveInfo.svelte";
  import LocalizationInfo from "../components/Dashboard/LocalizationInfo.svelte";
  import AutoSettings from "../components/Dashboard/AutoSettings.svelte";
  import ControllerMap from "../components/Dashboard/ControllerMap.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;

  let isControllerMapVisible: boolean = $state(false);
</script>

<main>
{#if nt.isConnected}
  <div class="header">
    <div class="left">
      <RobotInfo 
        mode={ nt.topics.get(Topics[Topic.RobotMode])?.value } 
        state={ nt.topics.get(Topics[Topic.RobotState])?.value } />
      <GameInfo 
        alliance={ nt.topics.get(Topics[Topic.Alliance])?.value } 
        team={ nt.topics.get(Topics[Topic.Team])?.value }
        station={ nt.topics.get(Topics[Topic.Station])?.value } />
    </div>
    <div class="center">
      <div class="controller-map-button">
        <button onclick={() => { isControllerMapVisible = true; }}>
          <img src="./assets/images/controller.png" alt="Controller Map" />
        </button>
      </div>
      <div class="data-view-button">
        <button onclick={() => { (window as any).driverStationApp.openDataView(); }}>
          <DataTable fill={ "#FF69B4" } width=52 height=52 />
        </button>
      </div>
    </div>
    <div class="right">
      <PowerInfo 
        batteryInfo={ nt.topics.get(Topics[Topic.BatteryInfo])?.value }
        batteryVoltage={ nt.topics.get(Topics[Topic.BatteryVoltage])?.value } />
    </div>
  </div>
  <div class="widgets">
    <Tile class="widget row-span-2">
      <Settings />
    </Tile>
    <Tile class="widget">
      <DriveInfo
        driveSpeedMax={ nt.topics.get(Topics[Topic.DriveSpeedMax])?.value }
        swerveModuleFrontLeftDrivingSpeedTarget={ nt.topics.get(Topics[Topic.DriveSwerveModuleFrontLeftDrivingSpeedTarget])?.value }
        swerveModuleFrontLeftDrivingSpeedActual={ nt.topics.get(Topics[Topic.DriveSwerveModuleFrontLeftDrivingSpeedActual])?.value }
        swerveModuleFrontLeftTurningPosition={ nt.topics.get(Topics[Topic.DriveSwerveModuleFrontLeftTurningPosition])?.value } 
        swerveModuleFrontRightDrivingSpeedTarget={ nt.topics.get(Topics[Topic.DriveSwerveModuleFrontRightDrivingSpeedTarget])?.value }
        swerveModuleFrontRightDrivingSpeedActual={ nt.topics.get(Topics[Topic.DriveSwerveModuleFrontRightDrivingSpeedActual])?.value }
        swerveModuleFrontRightTurningPosition={ nt.topics.get(Topics[Topic.DriveSwerveModuleFrontRightTurningPosition])?.value } 
        swerveModuleRearLeftDrivingSpeedTarget={ nt.topics.get(Topics[Topic.DriveSwerveModuleRearLeftDrivingSpeedTarget])?.value }
        swerveModuleRearLeftDrivingSpeedActual={ nt.topics.get(Topics[Topic.DriveSwerveModuleRearLeftDrivingSpeedActual])?.value }
        swerveModuleRearLeftTurningPosition={ nt.topics.get(Topics[Topic.DriveSwerveModuleRearLeftTurningPosition])?.value } 
        swerveModuleRearRightDrivingSpeedTarget={ nt.topics.get(Topics[Topic.DriveSwerveModuleRearRightDrivingSpeedTarget])?.value }
        swerveModuleRearRightDrivingSpeedActual={ nt.topics.get(Topics[Topic.DriveSwerveModuleRearRightDrivingSpeedActual])?.value }
        swerveModuleRearRightTurningPosition={ nt.topics.get(Topics[Topic.DriveSwerveModuleRearRightTurningPosition])?.value } />
    </Tile>
    <Tile class="widget">
      <LocalizationInfo 
        robotPose={ nt.topics.get(Topics[Topic.RobotPose])?.value }
        frontPoseSensorIsConnected={ nt.topics.get(Topics[Topic.FrontPoseSensorIsConnected])?.value }
        frontPoseSensorHasTarget={ nt.topics.get(Topics[Topic.FrontPoseSensorHasTarget])?.value }
        frontPoseSensorTargetCount={ nt.topics.get(Topics[Topic.FrontPoseSensorTargetCount])?.value }
        rearPoseSensorIsConnected={ nt.topics.get(Topics[Topic.RearPoseSensorIsConnected])?.value }
        rearPoseSensorHasTarget={ nt.topics.get(Topics[Topic.RearPoseSensorHasTarget])?.value }
        rearPoseSensorTargetCount={ nt.topics.get(Topics[Topic.RearPoseSensorTargetCount])?.value }
        leftPoseSensorIsConnected={ nt.topics.get(Topics[Topic.LeftPoseSensorIsConnected])?.value }
        leftPoseSensorHasTarget={ nt.topics.get(Topics[Topic.LeftPoseSensorHasTarget])?.value }
        leftPoseSensorTargetCount={ nt.topics.get(Topics[Topic.LeftPoseSensorTargetCount])?.value }
        rightPoseSensorIsConnected={ nt.topics.get(Topics[Topic.RightPoseSensorIsConnected])?.value }
        rightPoseSensorHasTarget={ nt.topics.get(Topics[Topic.RightPoseSensorHasTarget])?.value }
        rightPoseSensorTargetCount={ nt.topics.get(Topics[Topic.RightPoseSensorTargetCount])?.value }
        cameraStreams={ JSON.parse(nt.topics.get(Topics[Topic.CameraStreams])?.value ?? null) } /> 
    </Tile>
    <Tile class="widget row-span-2">
      <AutoSettings
        alliance={ nt.topics.get(Topics[Topic.Alliance])?.value } />
    </Tile>
    <Tile class="widget">
    </Tile>
    <Tile class="widget">
    </Tile>
    <ControllerMap 
      bind:isControllerMapVisible={ isControllerMapVisible } />
  </div>
{:else}
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ nt.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton />
  </div>
  <div class="watermark"><SkeletonPlaceholder class="skeleton" /><svg class="icon"><use xlink:href="#iconRobot"/></svg></div>
{/if}
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    
    & > .header {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 100px;
      padding: 0 20px;

      & .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1.5em;
      }

      & .center {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5em;
      }

      & .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      & .controller-map-button, .data-view-button {
        & button {
          margin: 6px 0 0 0;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;

          & img {
            height: 42px;
          }
        }
      }
    }

    & > .widgets {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 350px;
      column-gap: 10px;
      row-gap: 10px;
      padding: 0 20px;

      & :global(.widget) {
        padding: 2em;

        &:global(.row-span-2) {
          grid-row: span 2;
        }

        & :global(.title) {
          margin-bottom: 1.5em;
          border-bottom: 1px solid var(--app-color-charcoal);
          padding: 0px 3px;
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

    & :global(.skeleton) {
      position: absolute;
      width: 256px;
      height: 256px;
    }

    & .icon {
      position: absolute;
      width: 256px;
      height: 256px;
      fill: var(--app-color-pink);
    }
  }
</style>