<script lang="ts">
  import { RobotType } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let robotType = $derived(nt.topics.get("/SmartDashboard/Game/Robot/Type")?.value as RobotType);

  let gyroIsConnected = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Gyro/IsConnected")?.value ?? false as boolean);
  let gyroSensorValue = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Gyro/Heading")?.value ?? 0 as number);
  let hopperSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Distance/Hopper/HasTarget")?.value ?? false as boolean);
  let hopperSensorDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Distance/Hopper/Value")?.value ?? 0 as number);
  let indexerSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Binary/Indexer/HasTarget")?.value ?? false as boolean);
</script>
  
<div class="main">
  <div class="title"><h4>Sensors</h4></div>
  <div class="sensors">
    <div><span class="label">Gyro:</span><span class="state" class:active={ gyroIsConnected }></span><span class="value">{ gyroSensorValue?.toFixed(2) ?? NaN } &deg;</span></div>
    {#if robotType == RobotType.Competition}
    <div><span class="label">Hopper:</span><span class="state" class:active={ hopperSensorHasTarget }></span><span class="value">{ hopperSensorDistance }<span class="unit">mm</span></span></div>
    <div><span class="label">Indexer:</span><span class="state" class:active={ indexerSensorHasTarget }></span></div>
    {/if}
  </div>
</div>
  
<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    
    & .sensors {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin: 1.5em 0 0 .5em;
      font-size: 1.25rem;
      text-transform: capitalize;

      & .label {
        display: inline-block;
        width: 80px;
        font-size: 0.9rem;
        color: var(--app-color-smoke);
        text-transform: none;
      }

      & .state {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--app-color-red);

        &.active {
          background-color: var(--app-color-green);
        }
      }

      & .value {
        margin-left: 1.5em;
        text-transform: none;

        & .unit {
          margin-left: .25em;
          font-size: 80%;
        }
      }
    }
  }
</style>