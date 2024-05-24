<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder, Tile } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { NetworkTables } from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import CameraStream from "../components/Hud/CameraStream.svelte";
  import MatchTime from "../components/Hud/MatchTime.svelte";
  import RobotAlignment from "../components/Hud/RobotAlignment.svelte";
  import LauncherAlignment from "../components/Hud/LauncherAlignment.svelte";
  import IntakeStatus from "../components/Hud/IntakeStatus.svelte";
  import NoteAlignment from "../components/Hud/NoteAlignment.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;
  let nt: NetworkTables;
  $: { nt = $NetworkTablesStore; }

  let driverStationVideoSource: HTMLVideoElement = null;
  $: {
    if (nt.isConnected) {
      if (driverStationVideoSource === null) {
        loadDriverStationVideoStream();
      }
    } else {
      driverStationVideoSource = null;
    }
  }

  const loadDriverStationVideoStream = async (): Promise<void> => {
    try {
      let deviceId: string;
      const devices = await navigator.mediaDevices.enumerateDevices();
      for (const device of devices) {
        if (device.label.includes("HD USB Camera")) {
          deviceId = device.deviceId;
          break;
        }
      }
      if (deviceId) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId} }
        });
        driverStationVideoSource.srcObject = stream;
        driverStationVideoSource.play();
      }
    } catch (e) {}
  }
</script>

<main>
{ #if nt.isConnected }
  <div class="primary">
    <Tile class="widget">
      <RobotAlignment
        alliance={ nt.topics.get(Topics.Alliance)?.value }
        robotPose={ nt.topics.get(Topics.RobotPose)?.value } 
        isAlignedToTarget={ nt.topics.get(Topics.DriveIsAlignedToTarget)?.value }
        launcherBottomBeamBreakSensorHasTarget={ nt.topics.get(Topics.LauncherBottomBeamBreakSensorHasTarget)?.value }
        launcherTopBeamBreakSensorHasTarget={ nt.topics.get(Topics.LauncherTopBeamBreakSensorHasTarget)?.value }
      />
    </Tile>
    <Tile class="widget">
      <CameraStream 
        stream={ Configuration.Settings.CameraStreams.Front } 
        width={ "800px" } 
        height={ "520px" } />
    </Tile>
    <Tile class="widget">
      <LauncherAlignment 
        launcherArmIsAlignedToTarget={ nt.topics.get(Topics.LauncherArmIsAlignedToTarget)?.value }
        launcherArmPosition={ nt.topics.get(Topics.LauncherArmPosition)?.value } 
        launcherBottomBeamBreakSensorHasTarget={ nt.topics.get(Topics.LauncherBottomBeamBreakSensorHasTarget)?.value }
        launcherTopBeamBreakSensorHasTarget={ nt.topics.get(Topics.LauncherTopBeamBreakSensorHasTarget)?.value } />
    </Tile>
  </div>
  <div class="secondary">
    <Tile class="widget">
      <NoteAlignment 
        frontNoteObjectSensorHasTarget={ nt.topics.get(Topics.FrontNoteObjectSensorHasTarget)?.value }
        frontNoteObjectSensorTargetYaw={ nt.topics.get(Topics.FrontNoteObjectSensorTargetYaw)?.value }
        frontNoteObjectSensorTargetArea={ nt.topics.get(Topics.FrontNoteObjectSensorTargetArea)?.value } />
    </Tile>
    <Tile class="widget">
      <div style="position:relative;background:#000000;overflow:hidden;">
        <video 
          style="width:800px;height:450px;transform:scale(1.333);"
          bind:this={ driverStationVideoSource }>
          <track kind="captions"/>
        </video>
        <div class="matchtime">
          <MatchTime 
            matchTime={ nt.topics.get(Topics.MatchTime)?.value } />
        </div>
      </div>
    </Tile>
    <Tile class="widget">
      <IntakeStatus 
        launcherBottomBeamBreakSensorHasTarget={ nt.topics.get(Topics.LauncherBottomBeamBreakSensorHasTarget)?.value }
        launcherTopBeamBreakSensorHasTarget={ nt.topics.get(Topics.LauncherTopBeamBreakSensorHasTarget)?.value }
        intakeRollerSpeed={ nt.topics.get(Topics.IntakeRollerSpeed)?.value } />
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

<style>
  main {
    position: relative;
    display: grid;
    grid-template-rows: 540px auto;
    row-gap: 0px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding: 10px;

    & > .primary {
      display: grid;
      grid-template-columns: 540px 820px 540px;
    }

    & > .secondary {
      display: grid;
      grid-template-columns: 540px 820px 540px;
    }

    & .matchtime {
      position: absolute;
      top: 0;
      width: 800px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
    }

    & :global {
      & .widget {
        margin: 10px;
        padding: 0px;
        background: #1C1C1C;
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

    & :global {
      & .skeleton {
        position: absolute;
        width: 256px;
        height: 256px;
      }
    }

    & .icon {
      position: absolute;
      width: 256px;
      height: 256px;
      fill: var(--app-color-pink);
    }
  }
</style>