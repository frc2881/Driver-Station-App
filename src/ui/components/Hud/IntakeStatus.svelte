<script lang="ts">
  import Light from "carbon-icons-svelte/lib/Light.svelte";
  import LightFilled from "carbon-icons-svelte/lib/LightFilled.svelte";
  import HighSpeedDataTransport from "carbon-pictograms-svelte/lib/HighSpeedDataTransport.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let intakeSpeed: number;
  export let launcherDistanceSensorHasTarget: boolean;
  export let launcherDistanceSensorValue: number;
  export let intakeIsLoaded: boolean;
  export let intakeIsLaunchReady: boolean;
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ intakeIsLoaded }>
    <CheckmarkFilled width=540 height=540 fill="#00CC00" />
  </div>
  <div class="levels">
    <div class="level">
      <div class="sensor"><LightFilled width="48" height="48" /></div>
      <div class="beam" class:active={ !launcherDistanceSensorHasTarget }></div>
      <div class="sensor"><Light width="48" height="48" /></div>
      <div class="distance">{ launcherDistanceSensorValue ?? "" }</div>
    </div>
    <div 
      class="note"
      class:active= { launcherDistanceSensorHasTarget } 
      class:bottom={ launcherDistanceSensorHasTarget && !intakeIsLoaded }
      class:top={ launcherDistanceSensorHasTarget && intakeIsLoaded }
      class:launchReady={ intakeIsLaunchReady }>
    </div>
  </div>
  <div class="motors">
    <div 
      class="belts"
      class:active={ intakeSpeed !== 0 }
      class:front={ intakeSpeed < 0 }
      class:rear={ intakeSpeed > 0 }>
      <HighSpeedDataTransport width="128" height="128" />
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
    gap: 6em;

    & .levels {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2em;

      & .level {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 1em;

        & .sensor {
          opacity: 0.75;
        }

        & .beam {
          width: 280px;
          height: 2px;
          background: var(--app-color-charcoal);
          opacity: 0;

          &.active { opacity: 1; }
        }

        & .distance {
          position: absolute;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 200%;
          margin-top: -.25em;
          z-index: 1;
        }
      }

      & .note {
        position: absolute;
        width: 280px;
        height: 48px;
        background: #CC6633;
        border-radius: 24px;
        opacity: 0;

        &.active { opacity: 1; }
        &.bottom { bottom: -4em; }
        &.top { bottom: 0.25em; }

        &.launchReady { animation: pulse-expand 500ms infinite ease; }
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
          color: var(--app-color-green);
        }
        &.front {
          animation: rotate 250ms infinite ease;
        }
        &.rear {
          animation: rotate reverse 250ms infinite ease;
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
      z-index: 9999;

      &.active {
        display: flex;
      }
    }
  }
</style>