<script lang="ts">
  import { Tile, InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { NetworkTablesService as nt } from "../services/NetworkTables.svelte";
  import RobotInfo from "../components/Dashboard/RobotInfo.svelte";
  import GameInfo from "../components/Dashboard/GameInfo.svelte";
  import PowerInfo from "../components/Dashboard/PowerInfo.svelte";
  import Settings from "../components/Dashboard/Settings.svelte";
  import DriveInfo from "../components/Dashboard/DriveInfo.svelte";
  import LocalizationInfo from "../components/Dashboard/LocalizationInfo.svelte";
  import SensorInfo from "../components/Dashboard/SensorInfo.svelte";
  import AutoSettings from "../components/Dashboard/AutoSettings.svelte";
  import ResetStatus from "../components/Dashboard/ResetStatus.svelte";
  import ControllerMap from "../components/Dashboard/ControllerMap.svelte";

  let isControllerMapVisible: boolean = $state(false);
</script>

<main>
{#if nt.isConnected}
  <div class="header">
    <div class="left">
      <RobotInfo />
      <GameInfo />
    </div>
    <div class="center">
      <div class="controller-map-button">
        <button onclick={() => { isControllerMapVisible = true; }}>
          <img src="./assets/images/controller.png" alt="Controller Map" />
        </button>
      </div>
    </div>
    <div class="right">
      <PowerInfo />
    </div>
  </div>
  <div class="widgets">
    <Tile class="widget row-span-2">
      <Settings />
    </Tile>
    <Tile class="widget">
      <SensorInfo />
    </Tile>
    <Tile class="widget">
      <LocalizationInfo />
    </Tile>
    <Tile class="widget row-span-2">
      <AutoSettings />
    </Tile>
    <Tile class="widget">
    </Tile>
    <Tile class="widget">
      <ResetStatus />
    </Tile>
    <ControllerMap bind:isControllerMapVisible={ isControllerMapVisible } />
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

      & .controller-map-button {
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

    & img {
      position: absolute;
      height: 512px;
      transform: translate(-64px, -256px);
      animation: pulse 1500ms infinite ease;
    }
  }
</style>