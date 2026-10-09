<script lang="ts">
  import SendableChooser from "../SendableChooser.svelte";
</script>

<div class="main">
  <div class="title"><h4>Settings</h4></div>
  <!-- <div class="category">
    <div class="label">Drive</div>
    <SendableChooser
      name="Speed Mode"
      key="/Telemetry/Robot/Drive/SpeedMode"
      useInline={ true } />
    <SendableChooser
      name="Drift Correction"
      key="/Telemetry/Robot/Drive/DriftCorrection"
      useToggle={ true } />
    <SendableChooser
      name="Idle Mode"
      key="/Telemetry/Robot/Drive/IdleMode"
      useToggle={ true }
      invertToggle={ true } />
    <SendableChooser
      name="Orientation"
      key="/Telemetry/Robot/Drive/Orientation"
      useInline={ true } />
  </div> -->
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
        font-size: 1.2rem;
        border-bottom: 1px solid var(--app-color-charcoal);
      }
    }
  }
</style>