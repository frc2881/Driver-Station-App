<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";

  export let hasInitialReset: boolean;
  export let matchTime: number;
</script>

<div class="main">
  <div class="title"><h4>Resets</h4></div>
  <div class="status">
    { #if !hasInitialReset && matchTime === -1 }
      <div class="warning"><CloseFilled width=160 height=160 fill="#CC0000" /></div>
      <div class="info">All subsystem arm mechanisms must be<br/><u>manually reset</u> prior to engagement!</div>
    { :else }
      <div><CheckmarkFilled width=160 height=160 fill="#009900" /></div>
      <div class="info">All subsystem arm mechanisms<br/>are ready for engagement.</div>
    { /if } 
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    
    .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 2em 0;
      
      .warning {
        animation: pulse 500ms infinite ease;
      }

      .info {
        margin: 1em 0;
        text-align: center;
        font-size: 120%;
      }
    }
  }

  @keyframes pulse {
    0% { opacity: 1; }
    100% { opacity: 0.2; }
  }
</style>