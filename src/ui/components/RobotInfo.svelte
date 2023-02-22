<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import WarningAltFilled from "carbon-icons-svelte/lib/WarningAltFilled.svelte";
  import { 
    NetworkTablesTopic,
    RobotStatus
	} from "../../common";

  export let mode: NetworkTablesTopic;
  export let status: NetworkTablesTopic;
</script>

<div class="main">
  <div class="mode">
    <h3>{ status?.value === RobotStatus.Estopped ? "ESTOP" : mode?.value }</h3>
  </div>
  <div class="status">
    { #if status?.value === RobotStatus.Enabled }
      <CheckmarkFilled width=48 height=48 fill="#00CC00" />
    { /if }
    { #if status?.value === RobotStatus.Disabled }
      <CloseFilled width=48 height=48 fill="#CC0000" />
    { /if }
    { #if status?.value === RobotStatus.Estopped }
      <WarningAltFilled width=48 height=48 fill="#CCCC00" />
    { /if } 
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;

    .mode {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160px;
      padding: 5px 0;
      border: 1px solid var(--app-color-charcoal);
    }

    .status {
      margin: 3px 0 0 20px;
    }
  }
</style>