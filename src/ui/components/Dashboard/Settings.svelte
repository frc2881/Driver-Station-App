<script lang="ts">
  import { Configuration } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte";
  import SendableChooser from "../SendableChooser.svelte";

  const { Topics } = Configuration.Settings.NetworkTables;
</script>

<div class="main">
  <div class="title"><h4>Settings</h4></div>
  <div class="category">
    <div class="label">Drive</div>
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

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    
    & .category {
      display: flex;
      flex-direction: column;
      margin: 2em 1em;

      & .label {
        margin: 0 4em 1em 0;
        padding-bottom: .5em;
        font-size: 120%;
        border-bottom: 4px solid var(--app-color-charcoal);
      }
    }
  }
</style>