<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import Aperture from "carbon-icons-svelte/lib/Aperture.svelte";
  import CicsExplorer from "carbon-icons-svelte/lib/CicsExplorer.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isGripperEnabled = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Gripper/IsEnabled")?.value as boolean);
  let isGripperHolding = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Gripper/IsHolding")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isGripperHolding }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="components">
    {#if isGripperHolding}
      <div class="gripper"><CicsExplorer width=240 height=240 fill="#FFFFFF" /></div>
    {:else}
      {#if isGripperEnabled}
        <div class="gripper enabled"><Aperture width=240 height=240 fill="#FF69B4" /></div>
      {:else}
        <div><Aperture width=240 height=240 fill="#666666" /></div>
      {/if}
    {/if}
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
      z-index: 9999;
      &.active { display: flex; }
      & .checkmark { animation: pulse 500ms infinite ease-out; }
    }

    & .components {
      display: flex;
      flex-direction: column;
      gap: 2em;

      & .gripper {
        &.enabled { animation: rotate 500ms infinite linear; }
      }
    }
  }
</style>