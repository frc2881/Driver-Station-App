<script lang="ts">
  import { Configuration } from "../../../config";
  import { NetworkTables } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import SendableChooser from "../SendableChooser.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;

  let active = "";

  let nt: NetworkTables;
  $: { nt = $NetworkTablesStore; }

  $: { active = nt.topics.get(`${Topics.AutoCommand}/active`)?.value ?? ""; }
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
    class:none={ active === "None" }>
    <h4>{ active }</h4>
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
      margin-top: 3em;
      padding: 1em;
      text-align: center;
      color: var(--app-color-green);
      border: 1px solid var(--app-color-green);

      &.none {
        color: var(--app-color-charcoal);
        border-color: var(--app-color-charcoal);
      }
    }
  }
</style>