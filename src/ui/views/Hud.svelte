<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder, Tile } from "carbon-components-svelte";
  import { Configuration, type NetworkTables } from "../../common/index.js";
  import { NetworkTablesStore } from "../stores/NetworkTables.js";
  import CameraStream from "../components/CameraStream.svelte";
  import MatchTime from "../components/Hud/MatchTime.svelte";
  import TargetAlignment from "../components/Hud/TargetAlignment.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;
  let nt: NetworkTables;
  $: { nt = $NetworkTablesStore; }
</script>

<main>
{ #if nt.isConnected }
  <div class="row">
    <Tile class="widget">
      <TargetAlignment
        alliance={ nt.topics.get(Topics.Alliance)?.value }
        robotPose={ nt.topics.get(Topics.RobotPose)?.value } 
        isAlignedToTarget={ nt.topics.get(Topics.DriveIsAlignedToTarget)?.value }
        fieldLength={ nt.topics.get(Topics.FieldLength)?.value }
        fieldWidth={ nt.topics.get(Topics.FieldWidth)?.value }
        driveLength={ nt.topics.get(Topics.DriveLength)?.value }
        driveWidth={ nt.topics.get(Topics.DriveWidth)?.value } />
    </Tile>
    <Tile class="widget">
      <CameraStream
        streamUrl={ JSON.parse(nt.topics.get(Topics.CameraStreams)?.value ?? null)?.Driver }
        width={ 810 } 
        height={ 530 } />
    </Tile>
    <Tile class="widget">
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
            matchTime={ nt.topics.get(Topics.MatchTime)?.value } />
        </div>
      </div>
    </Tile>
    <Tile class="widget">
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

    & :global {
      & .widget {
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

  @media (height <= 840px) {
    main {
      transform: scale(.75) translateY(-80px);
      height: 75vh;
      overflow: visible;
    }
  }
</style>