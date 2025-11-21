<script lang="ts">
  import { CheckmarkFilled, WarningAltFilled } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isHomed = $derived(nt.topics.get("/SmartDashboard/Robot/Status/IsHomed")?.value as boolean);
</script>
  
<div class="main">
  <div class="title"><h4>Homing</h4></div>
  <div class="status">
    {#if !isHomed}
      <div class="warning"><WarningAltFilled width=120 height=120 fill="#CCCC00" /></div>
      <div class="info">All required mechanisms must<br />be homed prior to operation!</div>
    {:else}
      <div><CheckmarkFilled width=120 height=120 fill="#009900" /></div>
      <div class="info">All mechanisms are homed<br />and safe for operation.</div>
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
    
    & .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 3em 0;
      
      & .warning {
        animation: pulse 750ms infinite ease;
      }

      & .info {
        margin: 1em 0;
        text-align: center;
        font-size: 120%;
        line-height: 150%;
      }
    }
  }
</style>