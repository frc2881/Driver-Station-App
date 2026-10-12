<script lang="ts">
  import { CircleSolid } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let launcherIsLoaded = $derived(nt.topics.get("/Telemetry/Robot/Sensors/Proximity/Launcher/HasTarget")?.value ?? false as boolean);
</script>
<div class="main">
  <div class="status">
    <div class="hay">
      {#if launcherIsLoaded}
        <CircleSolid width=320 height=320 fill="#00C3C8" />
      {:else}
        <CircleSolid width=320 height=320 fill="transparent" stroke="#333333" />
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

      & .hay {
        padding-bottom: 3em;
        border-bottom: 10px solid var(--app-color-white);
      }
    }
  }
</style>