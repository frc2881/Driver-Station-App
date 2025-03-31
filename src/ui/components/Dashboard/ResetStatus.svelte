<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import WarningAltFilled from "carbon-icons-svelte/lib/WarningAltFilled.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let hasAllZeroResets = $derived(nt.topics.get("/SmartDashboard/Robot/Status/HasAllZeroResets")?.value as boolean);
</script>
  
<div class="main">
  <div class="title"><h4>Reset</h4></div>
  <div class="status">
    {#if !hasAllZeroResets}
      <div class="warning"><WarningAltFilled width=160 height=160 fill="#CCCC00" /></div>
      <div class="info">All mechanisms must be <br/><u>manually reset to zero positions</u><br/> prior to engagement!</div>
    {:else}
      <div><CheckmarkFilled width=160 height=160 fill="#009900" /></div>
      <div class="info">All mechanisms<br/>are ready for engagement.</div>
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
      margin: 1.5em 0;
      
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