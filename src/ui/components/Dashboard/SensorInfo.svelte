<script lang="ts">
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let gripperSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Binary/Gripper/HasTarget")?.value as boolean);
  let intakeSensorHasTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Binary/Intake/HasTarget")?.value as boolean);
  let gyroSensorValue = $derived(nt.topics.get("/SmartDashboard/Robot/Sensors/Gyro/Heading")?.value as number);
</script>
  
<div class="main">
  <div class="title"><h4>Sensors</h4></div>
  <div class="sensors">
    <div><span class="label">Gripper:</span>{ gripperSensorHasTarget }</div>
    <div><span class="label">Intake:</span>{ intakeSensorHasTarget }</div>
    <div><span class="label">Gyro:</span>{ gyroSensorValue?.toFixed(2) ?? NaN }</div>
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