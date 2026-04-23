<script lang="ts">
  import { CheckmarkFilled, WarningAltFilled } from "carbon-icons-svelte";
  import { CircleSolid, Aperture } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  // svelte-ignore non_reactive_update
  const enum FuelLevel {
    Empty = "Empty",
    Low = "Low",
    Mid = "Mid",
    Full = "Full"
  }

  const getFuelCountForDisplay = (fuelLevel: FuelLevel): number => {
    switch (fuelLevel) {
      case FuelLevel.Empty: return 0;
      case FuelLevel.Low: return 3;
      case FuelLevel.Mid: return 6;
      case FuelLevel.Full: return 9;
      default: return 0;
    }
  }

  let isIntakeExtended = $derived(nt.topics.get("/SmartDashboard/Robot/Intake/IsExtended")?.value ?? false as boolean);
  let isIntakeRunning = $derived(nt.topics.get("/SmartDashboard/Robot/Intake/IsRunning")?.value ?? false as boolean);
  let isHopperRunning = $derived(nt.topics.get("/SmartDashboard/Robot/Hopper/IsRunning")?.value ?? false as boolean);
  let isHopperJammed = $derived(nt.topics.get("/SmartDashboard/Robot/Hopper/IsJammed")?.value ?? false as boolean);
  let fuelLevel = $derived(nt.topics.get("/SmartDashboard/Robot/Hopper/FuelLevel")?.value ?? FuelLevel.Empty as FuelLevel);
</script>
<div class="main">
  <div 
    class="ready"
    class:active={ fuelLevel == FuelLevel.Full && !isHopperJammed }>
    <div class="icon"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div 
    class="warning"
    class:active={ isHopperJammed }>
    <div class="icon"><WarningAltFilled width=480 height=480 fill="#CCCC00" /></div>
  </div>
  <div class="status">
    <div class="hopper">
      <div class="fuelLevel">
        {#each Array.from({ length: getFuelCountForDisplay(fuelLevel) }) as _}  
          <CircleSolid width=60 height=60 fill="#B1902F" />
        {/each} 
      </div>
      <div class="indexer" class:running={ isHopperRunning }></div>
    </div>
    <div class="intake">
      <div class="arm" style:border-width={ `0px ${isIntakeExtended ? 50 : 10}px 150px 0px` } ></div>
      <div class="roller" class:running={ isIntakeRunning }><Aperture width=60 height=60 fill="#FF1493" /></div>
    </div>
  </div>
</div>

<style>
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    & .ready, .warning {
      position: absolute;
      display: none;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      &.active { display: flex; }
      & .icon { animation: pulse 500ms infinite ease-out; }
    }

    & .status {
      display: flex;
      flex-direction: row;
      gap: 1.5em;
      margin-left: 4em;

      & .hopper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5em;

        & .fuelLevel {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          align-content: flex-end;
          flex-wrap: wrap;
          gap: .1em;
          width: 220px;
          height: 220px;
          padding: 1em 1em 1.25em 1em;
          border: 3px solid var(--app-color-pink);
          border-radius: 6px;
        }

        & .indexer {
          width: 80%;
          height: 10px;
          border: 5px solid var(--app-color-pink);
          border-radius: 5px;

          &.running { animation: pulse 500ms infinite linear; }
        }
      }

      & .intake {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 60px;

        & .arm {
          width: 0; 
          height: 0;
          border-style: solid;
          border-width: 1px;
          border-color: transparent transparent var(--app-color-pink) transparent;
          transform: rotate(0deg);
          margin-left: .5em;
        }

        & .roller {
          &.running { animation: rotate 400ms infinite linear; }
        }
      }
    }
  }
</style>