<script lang="ts">
  import { CheckmarkFilled, WarningAltFilled, CloseFilled } from "carbon-icons-svelte";
  import { RobotMode, RobotState } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let state = $derived(nt.topics.get("/SmartDashboard/Robot/Status/State")?.value as RobotState);
  let mode = $derived(nt.topics.get("/SmartDashboard/Robot/Status/Mode")?.value as RobotMode);
</script>

<div class="main">
  <div 
    class="mode" 
    class:active={ state === RobotState.Enabled }>
    <h3>{ state === RobotState.Estopped ? "ESTOP" : mode ?? "" }</h3>
  </div>
  <div class="status">
    {#if state === RobotState.Enabled}
      <CheckmarkFilled width=48 height=48 fill="#00CC00" />
    {:else if state === RobotState.Disabled}
      <CloseFilled width=48 height=48 fill="#CC0000" />
    {:else if state === RobotState.Estopped}
      <WarningAltFilled width=48 height=48 fill="#CCCC00" />
    {/if} 
  </div>
</div>

<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;

    & .mode {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 180px;
      padding: 5px 0;
      border: 1px solid var(--app-color-charcoal);
      text-transform: uppercase;

      &.active {
        background: var(--app-color-smoke);
        color: var(--app-color-black);
      }
    }

    & .status {
      margin: 3px 0 0 20px;
    }
  }
</style>