<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import Aperture from "carbon-icons-svelte/lib/Aperture.svelte";
  import CicsExplorer from "carbon-icons-svelte/lib/CicsExplorer.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isHandEnabled = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/IsEnabled")?.value as boolean);
  let isHandHolding = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/IsHolding")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isHandHolding }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="components">
    {#if isHandHolding}
      <div class="hand"><CicsExplorer width=160 height=160 fill="#FFFFFF" /></div>
    {:else}
      {#if isHandEnabled}
        <div class="hand enabled"><Aperture width=160 height=160 fill="#FF69B4" /></div>
      {:else}
        <div class="hand"><Aperture width=160 height=160 fill="#666666" /></div>
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
      align-items: center;
      gap: 2em;

      & .hand {
        &.enabled { animation: rotate 500ms infinite linear; }
      }
    }
  }
</style>