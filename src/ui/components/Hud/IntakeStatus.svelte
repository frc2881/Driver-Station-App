<script lang="ts">
  import Light from "carbon-icons-svelte/lib/Light.svelte";
  import LightFilled from "carbon-icons-svelte/lib/LightFilled.svelte";
  import HighSpeedDataTransport from "carbon-pictograms-svelte/lib/HighSpeedDataTransport.svelte";
  import ArrowRight from "carbon-icons-svelte/lib/ArrowRight.svelte";
  import ArrowLeft from "carbon-icons-svelte/lib/ArrowLeft.svelte";

  export let intakeBeamBreakSensorHasTarget: boolean;
  export let launcherBottomBeamBreakSensorHasTarget: boolean;
  export let launcherTopBeamBreakSensorHasTarget: boolean;
  export let intakeRollerSpeed: number;
</script>

<div class="main">
  <div class="level">
    <div class="sensor"><LightFilled width="36" height="36" /></div>
    <div class="beam" class:active={ !launcherTopBeamBreakSensorHasTarget }></div>
    <div class="sensor"><Light width="36" height="36" /></div>
  </div>
  <div class="level">
    <div class="sensor"><LightFilled width="36" height="36" /></div>
    <div class="beam" class:active={ !launcherBottomBeamBreakSensorHasTarget }></div>
    <div class="sensor"><Light width="36" height="36" /></div>
  </div>
  <div class="level">
    <div class="sensor"><LightFilled width="36" height="36" /></div>
    <div class="beam" class:active={ !intakeBeamBreakSensorHasTarget }></div>
    <div class="sensor"><Light width="36" height="36" /></div>
  </div>
  <div 
    class="note" 
    class:active={ intakeBeamBreakSensorHasTarget || launcherBottomBeamBreakSensorHasTarget || launcherTopBeamBreakSensorHasTarget }
    class:bottom={ intakeBeamBreakSensorHasTarget && !launcherBottomBeamBreakSensorHasTarget && !launcherTopBeamBreakSensorHasTarget }
    class:bottommiddle={ intakeBeamBreakSensorHasTarget && launcherBottomBeamBreakSensorHasTarget && !launcherTopBeamBreakSensorHasTarget }
    class:middle={ !intakeBeamBreakSensorHasTarget && launcherBottomBeamBreakSensorHasTarget && !launcherTopBeamBreakSensorHasTarget }
    class:middletop={ !intakeBeamBreakSensorHasTarget && launcherBottomBeamBreakSensorHasTarget && launcherTopBeamBreakSensorHasTarget }
    class:top={ !intakeBeamBreakSensorHasTarget && !launcherBottomBeamBreakSensorHasTarget && launcherTopBeamBreakSensorHasTarget }></div>
  <div class="level">
    <div 
      class="direction"
      class:active={ intakeRollerSpeed > 0 }><ArrowRight width="64" height="64" fill="#00CC00" /></div>
    <div 
      class="belts"
      class:front={ intakeRollerSpeed < 0 }
      class:rear={ intakeRollerSpeed > 0 }><HighSpeedDataTransport width="64" height="64" /></div>
    <div 
      class="direction"
      class:active={ intakeRollerSpeed < 0 }><ArrowLeft width="64" height="64" fill="#00CC00" /></div>
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 2em;

    .level {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1em;

      .sensor {
        opacity: 0.75;
      }

      .beam {
        width: 240px;
        height: 2px;
        background: var(--app-color-charcoal);
        opacity: 0;

        &.active { opacity: 1; }
      }

      .belts {
        &.front {
          animation: front 250ms infinite ease;
        }
        &.rear {
          animation: rear 250ms infinite ease;
        }
      }

      .direction {
        opacity: 0;

        &.active {
          opacity: 1;
          animation: pulse 500ms infinite ease;
        }
      }

    }

    .note {
      position: absolute;
      width: 220px;
      height: 32px;
      background: #CC6633;
      border-radius: 16px;
      opacity: 0;

      &.active { opacity: 1; }
      &.bottom { margin-bottom: -2.5em; }
      &.bottommiddle { margin-bottom: 2em; }
      &.middle { margin-bottom: 7em; }
      &.middletop { margin-bottom: 12em; }
      &.top { margin-bottom: 16.5em; }
    }
  }

  @keyframes pulse {
    0% { opacity: 1; }
    100% { opacity: 0.4; }
  }

  @keyframes front {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes rear {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-180deg); }
    100% { transform: rotate(-360deg); }
  }
</style>