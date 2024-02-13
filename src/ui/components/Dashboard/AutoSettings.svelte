<script lang="ts">
  import { NetworkTables } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import SendableChooser from "../SendableChooser.svelte";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }
</script>

<div class="main">
  <div class="title"><h4>Auto</h4></div>
  <div>
    <SendableChooser
      name="Auto Command"
      options={ networkTables.topics.get("/SmartDashboard/Robot/Auto/Command/options") }
      active={ networkTables.topics.get("/SmartDashboard/Robot/Auto/Command/active") } />
  </div>
  <div class="active">
    <h3>{ networkTables.topics.get("/SmartDashboard/Robot/Auto/Command/active")?.value }</h3>
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
      text-align: left;
      color: var(--app-color-green);
    }
  }
</style>