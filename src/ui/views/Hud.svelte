<script lang="ts">
  import { InlineNotification, Tile } from "carbon-components-svelte";
  import { RobotType } from "../../common/index.js";
  import { NetworkTablesService as nt } from "../services/NetworkTables.svelte";
  import CameraStream from "../components/CameraStream.svelte";
  import MatchTiming from "../components/Hud/MatchTiming.svelte";
  import TargetAlignment from "../components/Hud/TargetAlignment.svelte";

  let robotType = $derived(nt.topics.get("/SmartDashboard/Game/Robot/Type")?.value as RobotType);
</script>

<main>
{#if nt.isConnected}
  <div class="row">
    <Tile class="widget">
      <TargetAlignment />
    </Tile>
    <Tile class="widget">
      <CameraStream
        streamUrl={ nt.topics.get("/SmartDashboard/Robot/Cameras/Driver")?.value ?? null }
        width={ 810 } 
        height={ 530 } />
    </Tile>
    <Tile class="widget">
      {#if robotType == RobotType.Competition}
        <div class="placeholder"><img src="./assets/images/2881.png" alt="2881" /></div>
      {:else}
        <div class="placeholder"><img src="./assets/images/2881.png" alt="2881" /></div>
      {/if}
    </Tile>
  </div>
  <div class="row">
    <Tile class="widget">
      {#if robotType == RobotType.Competition}
        <div class="placeholder"><img src="./assets/images/2881.png" alt="2881" /></div>
      {:else}
        <div class="placeholder"><img src="./assets/images/2881.png" alt="2881" /></div>
      {/if}
    </Tile>
    <Tile class="widget">
      <div class="driverStationViewContainer">
        <CameraStream 
          deviceLabel={ "HD USB Camera" } 
          width={ 810 } 
          height={ 530 }
        />
        <div class="matchTiming">
          <MatchTiming />
        </div>
      </div>
    </Tile>
    <Tile class="widget">
      {#if robotType == RobotType.Competition}
        <div class="placeholder"><img src="./assets/images/2881.png" alt="2881" /></div>
      {:else}
        <div class="placeholder"><img src="./assets/images/2881.png" alt="2881" /></div>
      {/if}
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
  <div class="watermark"><img src="./assets/images/2881.png" alt="2881" /></div>
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

      & .matchTiming {
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

    & .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      & img {
        height: 240px;
        opacity: .2;
      }
    }

    & :global(.widget) {
      padding: 0px;
      background: var(--app-color-tile-background);
    } 
  }

  .inlineNotification {
    padding: .75em 2em;
  }

  .watermark {
    position: absolute;
    left: 50%;
    top: 50%;

    & img {
      position: absolute;
      height: 512px;
      transform: translate(-64px, -256px);
      animation: pulse 1500ms infinite ease;
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