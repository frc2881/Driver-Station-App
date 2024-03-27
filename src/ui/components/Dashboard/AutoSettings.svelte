<script lang="ts">
  import { Configuration } from "../../../config";
  import { NetworkTables, Alliance } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import SendableChooser from "../SendableChooser.svelte";

  export let alliance: Alliance;

  const { Topics } = Configuration.Settings.NetworkTables;
  let nt: NetworkTables;
  $: { nt = $NetworkTablesStore; }

  let activeCommand = "";
  $: { 
    activeCommand = nt.topics.get(`${Topics.AutoCommand}/active`)?.value ?? "None";
  }
</script>

<div class="main">
  <div class="title"><h4>Auto</h4></div>
  <div>
    <SendableChooser
      name="Auto Command"
      options={ nt.topics.get(`${Topics.AutoCommand}/options`) }
      active={ nt.topics.get(`${Topics.AutoCommand}/active`) } />
  </div>
  <div 
    class="active"
    class:none={ activeCommand === "None" }>
    <h4>{ activeCommand }</h4>
  </div>
  <div 
    class="autos">
    <img src="./assets/autos-{ alliance?.toLowerCase() ?? "blue" }.png" />
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }

    .active {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      margin-top: 2em;
      padding: 1em;
      text-align: center;
      color: var(--app-color-green);
      border: 1px solid var(--app-color-green);

      h4 {
        font-weight: bold;
      }

      &.none {
        color: var(--app-color-charcoal);
        border-color: var(--app-color-charcoal);
      }
    }

    .autos {
      background: var(--app-color-black);
      width: 400px;
      height: 440px;
      margin-top: 2em;
      img { 
        width: 100%; 
        transform: translateY(30px);
      }
    }
  }
</style>