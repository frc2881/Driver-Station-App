<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder, Tile } from "carbon-components-svelte";
  import { Configuration, Topic } from "../../common/index.js";
  import { NetworkTablesService as nt } from "../services/NetworkTables.svelte";
  import CameraStream from "../components/CameraStream.svelte";
  import MatchTime from "../components/Hud/MatchTime.svelte";
  import TargetAlignment from "../components/Hud/TargetAlignment.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;
</script>

<main>
{#if nt.isConnected}
  <div class="row">
    <Tile class="widget">
      <TargetAlignment
        alliance={ nt.topics.get(Topics[Topic.Alliance])?.value }
        robotPose={ nt.topics.get(Topics[Topic.RobotPose])?.value } 
        isAlignedToTarget={ nt.topics.get(Topics[Topic.DriveIsAlignedToTarget])?.value }
        fieldLength={ nt.topics.get(Topics[Topic.FieldLength])?.value }
        fieldWidth={ nt.topics.get(Topics[Topic.FieldWidth])?.value }
        driveLength={ nt.topics.get(Topics[Topic.DriveLength])?.value }
        driveWidth={ nt.topics.get(Topics[Topic.DriveWidth])?.value } />
    </Tile>
    <Tile class="widget">
      <CameraStream
        streamUrl={ JSON.parse(nt.topics.get(Topics[Topic.CameraStreams])?.value ?? null)?.Driver }
        width={ 810 } 
        height={ 530 } />
    </Tile>
    <Tile class="widget">
      <div style="padding:3em;font-size:200%;display:flex;flex-direction:column;gap:1.5em;">
        <div>Elevator: { (nt.topics.get(Topics[Topic.ElevatorPositionUpperStage])?.value as number)?.toFixed(3) } + { (nt.topics.get(Topics[Topic.ElevatorPositionLowerStage])?.value as number)?.toFixed(3) }</div>
        <div>Arm: { (nt.topics.get(Topics[Topic.ArmPosition])?.value as number)?.toFixed(3) }</div>
        <div>Wrist: { nt.topics.get(Topics[Topic.WristPosition])?.value }</div>
        <div>Gripper: { (nt.topics.get(Topics[Topic.HandGripperIsEnabled])?.value as boolean) ? ((nt.topics.get(Topics[Topic.HandGripperIsHolding])?.value as boolean) ? "Holding" : "Enabled") : "Disabled" }</div>
        <div>Suction: { (nt.topics.get(Topics[Topic.HandSuctionIsEnabled])?.value as boolean) ? ((nt.topics.get(Topics[Topic.HandSuctionIsHolding])?.value as boolean) ? "Holding" : "Enabled") : "Disabled" }</div>
      </div>
    </Tile>
  </div>
  <div class="row">
    <Tile class="widget">
    </Tile>
    <Tile class="widget">
      <div class="driverStationViewContainer">
        <CameraStream 
          deviceLabel={ "HD USB Camera" } 
          width={ 810 } 
          height={ 530 }
        />
        <div class="matchtime">
          <MatchTime 
            matchTime={ nt.topics.get(Topics[Topic.MatchTime])?.value } />
        </div>
      </div>
    </Tile>
    <Tile class="widget">
    </Tile>
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
    position: relative;
    display: grid;
    grid-template-rows: 530px 530px;
    row-gap: 10px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    & > .row {
      display: grid;
      grid-template-columns: 530px 810px 530px;
      column-gap: 10px;
    }

    & .driverStationViewContainer {
      position: relative;
      background: var(--app-color-black);
      overflow: hidden;
      height: 100%;

      & .matchtime {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }
    }

    & :global(.widget) {
      padding: 0px;
      background: #1C1C1C;
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

  @media (height <= 840px) {
    main {
      transform: scale(.75) translateY(-80px);
      height: 75vh;
      overflow: visible;
    }
  }
</style>