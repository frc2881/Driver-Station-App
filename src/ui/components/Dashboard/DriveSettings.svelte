<script lang="ts">
  import { Configuration } from "../../../config";
  import { NetworkTables } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import SendableChooser from "../../components/SendableChooser.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;

  let nt: NetworkTables;
  $: { nt = $NetworkTablesStore; }
</script>

<div class="main">
  <div class="title"><h4>Drive</h4></div>
  <div>
    <SendableChooser
      name="Orientation"
      inline
      options={ nt.topics.get(`${Topics.DriveOrientation}/options`) }
      active={ nt.topics.get(`${Topics.DriveOrientation}/active`) } />
    <SendableChooser
      name="Speed Mode"
      inline
      options={ nt.topics.get(`${Topics.DriveSpeedMode}/options`) }
      active={ nt.topics.get(`${Topics.DriveSpeedMode}/active`) } />
    <SendableChooser
      name="Drift Correction"
      inline
      options={ nt.topics.get(`${Topics.DriveDriftCorrection}/options`) }
      active={ nt.topics.get(`${Topics.DriveDriftCorrection}/active`) } />
    <SendableChooser
      name="Idle Mode"
      inline
      options={ nt.topics.get(`${Topics.DriveIdleMode}/options`) }
      active={ nt.topics.get(`${Topics.DriveIdleMode}/active`) } />
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