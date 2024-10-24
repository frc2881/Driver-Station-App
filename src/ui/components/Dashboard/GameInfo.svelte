<script lang="ts">
  import { Alliance } from "../../../common/index.js";

  interface Props {
    alliance: Alliance;
    team: number;
    station: number;
  }

  let { alliance, team, station }: Props = $props();
</script>

<div class="main">
  <div class="value { alliance?.toLowerCase() }">
    <h3>{ station ?? 0 }</h3>
  </div> 
  <div class="value team">
    <h3>{ team || "0000" }</h3>
  </div> 
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
      width: 42px;
      height: 42px;
    }

    & .blue { background-color: var(--app-color-blue); }
    & .red { background-color: var(--app-color-red); }

    & .team { 
      width: auto;
      padding: 0 1em;
      background-color: var(--app-color-pink); 
      color: var(--app-color-black); 
    }
  }
</style>