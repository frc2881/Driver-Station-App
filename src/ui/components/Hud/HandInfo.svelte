<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import Aperture from "carbon-icons-svelte/lib/Aperture.svelte";
  import Recording from "carbon-icons-svelte/lib/Recording.svelte";
  import RecordingFilled from "carbon-icons-svelte/lib/RecordingFilled.svelte";
  import RecordingFilledAlt from "carbon-icons-svelte/lib/RecordingFilledAlt.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isGripperEnabled = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Gripper/IsEnabled")?.value as boolean);
  let isSuctionEnabled = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Suction/IsEnabled")?.value as boolean);
  let isSuctionHolding = $derived(nt.topics.get("/SmartDashboard/Robot/Hand/Suction/IsHolding")?.value as boolean);
</script>
<div class="main">
  <div class="components">
  {#if isGripperEnabled}
    <div class="gripper enabled"><Aperture width=160 height=160 fill="#FF69B4" /></div>
  {:else}
    <div><Aperture width=160 height=160 fill="#666666" /></div>
  {/if}
  {#if isSuctionEnabled}
    {#if isSuctionHolding}
      <div class="suction enabled"><RecordingFilled width=160 height=160 fill="#FF69B4" /></div>
    {:else}
      <div class="suction enabled"><RecordingFilledAlt width=160 height=160 fill="#FF69B4" /></div>
    {/if}
  {:else}
    <div><Recording width=160 height=160 fill="#666666" /></div>
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

    & .components {
      display: flex;
      flex-direction: column;
      gap: 2em;

      & .gripper {
        &.enabled { animation: rotate 750ms infinite linear; }
      }

      & .suction {
        &.enabled { animation: pulse 500ms infinite ease; }
      }
    }
  }
</style>