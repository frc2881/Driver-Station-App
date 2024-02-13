<script lang="ts">
  import { NetworkTables } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import SendableChooser from "../../components/SendableChooser.svelte";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }
</script>

<div class="main">
  <div class="title"><h4>Drive</h4></div>
  <div>
    <SendableChooser
      name="Orientation"
      inline
      options={ networkTables.topics.get("/SmartDashboard/Robot/Drive/Orientation/options") }
      active={ networkTables.topics.get("/SmartDashboard/Robot/Drive/Orientation/active") } />
    <SendableChooser
      name="Speed Mode"
      inline
      options={ networkTables.topics.get("/SmartDashboard/Robot/Drive/SpeedMode/options") }
      active={ networkTables.topics.get("/SmartDashboard/Robot/Drive/SpeedMode/active") } />
    <SendableChooser
      name="Drift Correction"
      inline
      options={ networkTables.topics.get("/SmartDashboard/Robot/Drive/DriftCorrection/options") }
      active={ networkTables.topics.get("/SmartDashboard/Robot/Drive/DriftCorrection/active") } />
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
  }
</style>