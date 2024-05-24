<script lang="ts">
  import Light from "carbon-icons-svelte/lib/Light.svelte";
  import LightFilled from "carbon-icons-svelte/lib/LightFilled.svelte";
  import HighSpeedDataTransport from "carbon-pictograms-svelte/lib/HighSpeedDataTransport.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let launcherBottomBeamBreakSensorHasTarget: boolean;
  export let launcherTopBeamBreakSensorHasTarget: boolean;
  export let intakeRollerSpeed: number;

  let isReadyForLaunch: boolean = false;

  $: {
    isReadyForLaunch = launcherBottomBeamBreakSensorHasTarget && !launcherTopBeamBreakSensorHasTarget;
  }
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ isReadyForLaunch }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
  </div>
  <div class="levels">
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
    <div 
      class="note"
      class:active= { launcherBottomBeamBreakSensorHasTarget || launcherTopBeamBreakSensorHasTarget } 
      class:middle={ launcherBottomBeamBreakSensorHasTarget && !launcherTopBeamBreakSensorHasTarget }
      class:middletop={ launcherBottomBeamBreakSensorHasTarget && launcherTopBeamBreakSensorHasTarget }
      class:top={ !launcherBottomBeamBreakSensorHasTarget && launcherTopBeamBreakSensorHasTarget }>
    </div>
  </div>
  <div class="motors">
    <div 
      class="belts"
      class:active={ intakeRollerSpeed < 0 }>
      <HighSpeedDataTransport width="96" height="96" />
    </div>
  </div>
</div>

<style>
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 3em;

    & .levels {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2em;

      & .level {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 1em;

        & .sensor {
          opacity: 0.75;
        }

        & .beam {
          width: 240px;
          height: 2px;
          background: var(--app-color-charcoal);
          opacity: 0;

          &.active { opacity: 1; }
        }
      }

      & .note {
        position: absolute;
        width: 220px;
        height: 32px;
        background: #CC6633;
        border-radius: 16px;
        opacity: 0;

        &.active { opacity: 1; }
        &.middle { bottom: 0.25em; }
        &.middletop { bottom: 2.75em; }
        &.top { bottom: 5em; }
      }
    }

    & .motors {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1em;

      & .belts {
        &.active {
          animation: belts 250ms infinite ease;
        }
      }
    }

    & .alignment {
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      animation: pulse 500ms infinite ease;

      &.active {
        display: flex;
      }
    }
  }

  @keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 0.1; }
  }

  @keyframes belts {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }
</style>