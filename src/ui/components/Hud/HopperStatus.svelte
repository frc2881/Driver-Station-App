<script lang="ts">
  import { CircleSolid, CircleOutline, Aperture } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  // svelte-ignore non_reactive_update
  const enum FuelLevel {
    Empty = "Empty",
    Low = "Low",
    Mid = "Mid",
    Full = "Full"
  }

  const getFuelCount = (fuelLevel: FuelLevel): number => {
    switch (fuelLevel) {
      case FuelLevel.Empty:
        return 0;
      case FuelLevel.Low:
        return 3;
      case FuelLevel.Mid:
        return 6;
      case FuelLevel.Full:
        return 9;
      default: 
        return 0;
    }
  }

  let fuelLevel = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/FuelLevel")?.value ?? FuelLevel.Empty as FuelLevel);
  let indexerSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Distance/Indexer/HasTarget")?.value as boolean);
  let feederSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Binary/Feeder/HasTarget")?.value as boolean);
  let elevatorSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Binary/Elevator/HasTarget")?.value as boolean);
  let isIntakeExtended = $derived(nt.topics.get("/SmartDashboard/Robot/Intake/IsExtended")?.value as boolean);
  let isIntakeRunning = $derived(nt.topics.get("/SmartDashboard/Robot/Intake/IsRunning")?.value as boolean);
</script>
<div class="main">
  <div class="status">
    <div class="sensors">
      <div class="sensor">
        {#if elevatorSensorHasTarget }
          <CircleSolid width=60 height=60 fill="#B1902F" />
        {:else}
          <CircleOutline width=60 height=60 fill="#666666" />
        {/if}
      </div>
      <div class="sensor">
        {#if feederSensorHasTarget }
          <CircleSolid width=60 height=60 fill="#B1902F" />
        {:else}
          <CircleOutline width=60 height=60 fill="#666666" />
        {/if}
      </div>
      <div class="sensor">
        {#if indexerSensorHasTarget }
          <CircleSolid width=60 height=60 fill="#B1902F" />
        {:else}
          <CircleOutline width=60 height=60 fill="#666666" />
        {/if}
      </div>
    </div>
    <div class="fuelLevel">
      {#each Array.from({ length: getFuelCount(fuelLevel) }) as _}  
        <CircleSolid width=60 height=60 fill="#B1902F" />
      {/each} 
    </div>
    <div class="intake">
      <div class="arm" style:border-width={ `0px ${isIntakeExtended ? 60 : 0}px 150px 0px` } ></div>
      {#if isIntakeExtended }
        <div class="roller" class:running={ isIntakeRunning }><Aperture width=60 height=60 fill="#FF1493" /></div>
      {/if}
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

    & .status {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.5em;

      & .sensors {
        display: flex;
        flex-direction: column;
      }

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

      & .intake {
        display: flex;
        flex-direction: column;
        gap: .5em;
        width: 60px;

        & .arm {
          width: 0; 
          height: 0;
          border-style: solid;
          border-width: 0;
          border-color: transparent transparent var(--app-color-pink) transparent;
          transform: rotate(0deg);
        }

        & .roller {
          &.running { animation: rotate 400ms infinite linear; }
        }
      }
    }
  }
</style>