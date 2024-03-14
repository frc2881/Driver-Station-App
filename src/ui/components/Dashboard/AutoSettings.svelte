<script lang="ts">
  import { Configuration } from "../../../config";
  import { NetworkTables } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import SendableChooser from "../SendableChooser.svelte";

  let activeCommand = "";
  let autoImage = "./assets/autos/0.jpg";

  const { Topics } = Configuration.Settings.NetworkTables;

  let nt: NetworkTables;
  $: { 
    nt = $NetworkTablesStore; 
    activeCommand = nt.topics.get(`${Topics.AutoCommand}/active`)?.value ?? "";
    if (activeCommand !== "") {
      autoImage = `./assets/autos/${ activeCommand !== "None" ? activeCommand.replaceAll(" ", "").replaceAll(">", "-") : "0" }.jpg`;
    }
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
  <div class="auto">
    <img src={ autoImage } />
  </div>
</div>

<style lang="postcss">
  .main {
    position: relative;
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
      margin-top: 3em;
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
    .auto {
      width: 100%;
      margin-top: 4em;

      img { width: 100%; }
    }
  }
</style>