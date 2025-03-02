<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isGripperEnabled = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Gripper/IsEnabled")?.value as boolean);
  let isSuctionEnabled = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Suction/IsEnabled")?.value as boolean);
  let isSuctionHolding = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Suction/IsHolding")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isSuctionHolding }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="info">
    <div>Gripper: <span class:enabled={ isGripperEnabled }>{ isGripperEnabled ? "Enabled" : "Disabled" }</span></div>
    <div>Suction: <span class:enabled={ isSuctionEnabled }>{ isSuctionEnabled ? "Enabled" : "Disabled" }</span></div>
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

    & .alignment {
      position: absolute;
      display: none;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      opacity: 0.75;
      &.active { display: flex; }
      & .checkmark { animation: pulse 500ms infinite ease-out; }
    }

    & .info {
      display: flex;
      flex-direction: column;
      gap: 1em;
      font-size: 250%;

      & span {
        color: var(--app-color-charcoal);
        text-transform: uppercase;
      }

      & .enabled {
        color: var(--app-color-green);
      }
    }
  }
</style>