<script lang="ts">
  import SendableChooser from "../SendableChooser.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte";
</script>

<div class="main">
  <div class="title"><h4>Settings</h4></div>
  <div class="category">
    <div class="label">Drive</div>
    <SendableChooser
      name="Orientation" 
      inline
      options={ nt.topics.get(`/SmartDashboard/Robot/Drive/Orientation/options`) }
      active={ nt.topics.get(`/SmartDashboard/Robot/Drive/Orientation/active`) } />
    <SendableChooser
      name="Speed Mode"
      inline
      options={ nt.topics.get(`/SmartDashboard/Robot/Drive/SpeedMode/options`) }
      active={ nt.topics.get(`/SmartDashboard/Robot/Drive/SpeedMode/active`) } />
    <SendableChooser
      name="Drift Correction"
      inline
      options={ nt.topics.get(`/SmartDashboard/Robot/Drive/DriftCorrection/options`) }
      active={ nt.topics.get(`/SmartDashboard/Robot/Drive/DriftCorrection/active`) } />
    <SendableChooser
      name="Idle Mode"
      inline
      options={ nt.topics.get(`/SmartDashboard/Robot/Drive/IdleMode/options`) }
      active={ nt.topics.get(`/SmartDashboard/Robot/Drive/IdleMode/active`) } />
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