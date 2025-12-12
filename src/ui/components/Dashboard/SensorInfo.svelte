<script lang="ts">
  import { RobotType } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let robotType = $derived(nt.topics.get("/SmartDashboard/Game/Robot/Type")?.value as RobotType);

  let gyroSensorValue = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Gyro/Heading")?.value as number);
  let handSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Binary/Hand/HasTarget")?.value as boolean);
</script>
  
<div class="main">
  <div class="title"><h4>Sensors</h4></div>
  <div class="sensors">
    <div><span class="label">Gyro:</span>{ gyroSensorValue?.toFixed(2) ?? NaN } &deg;</div>
    {#if robotType == RobotType.Competition}
    <div><span class="label">Hand:</span>{ handSensorHasTarget ?? false }</div>
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
      font-size: 150%;
      text-transform: uppercase;

      & .label {
        display: inline-block;
        width: 80px;
        font-size: 14px;
        color: var(--app-color-smoke);
        text-transform: none;
      }
    }
  }
</style>