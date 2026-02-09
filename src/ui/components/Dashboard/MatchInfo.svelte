<script lang="ts">
  import { Alliance } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let alliance = $derived(nt.topics.get("/SmartDashboard/Match/Alliance")?.value as Alliance);
  let station = $derived(nt.topics.get("/SmartDashboard/Match/Station")?.value as number);
  let team = $derived(nt.topics.get("/SmartDashboard/Match/Team")?.value as number);
  let name = $derived(nt.topics.get("/SmartDashboard/Game/Robot/Name")?.value as string);
</script>

<div class="main">
  <div class="value { alliance?.toLowerCase() }">{ station ?? 0 }</div> 
  <div class="value team">{ team || "0000" }</div> 
  <div class="value name">{ name || "" }</div> 
</div>

<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;

    & .value {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      font-size: 2rem;

      &.blue { background-color: var(--app-color-blue); }
      &.red { background-color: var(--app-color-red); }

      &.team { 
        width: auto;
        padding: 0 1em;
        background-color: var(--app-color-pink); 
        color: var(--app-color-black); 
      }

      &.name {
        justify-content: left;
        width: auto;
        font-size: 1.25rem;
        color: var(--app-color-pink);
        white-space: nowrap;
      }
    }
  }
</style>