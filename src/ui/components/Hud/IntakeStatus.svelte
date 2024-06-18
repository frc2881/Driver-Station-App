<script lang="ts">
  import Light from "carbon-icons-svelte/lib/Light.svelte";
  import LightFilled from "carbon-icons-svelte/lib/LightFilled.svelte";
  import HighSpeedDataTransport from "carbon-pictograms-svelte/lib/HighSpeedDataTransport.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { Utils } from "../../../common";

  export let intakeSpeed: number;
  export let intakeIsAlignedForLaunch: boolean;
  export let intakeDistanceSensorHasTarget: boolean;
  export let launcherDistanceSensorHasTarget: boolean;
  export let launcherDistanceSensorValue: number;
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ intakeIsAlignedForLaunch }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
  </div>
  <div class="levels">
    <div class="level">
      <div class="sensor"><LightFilled width="36" height="36" /></div>
      <div class="beam" class:active={ !launcherDistanceSensorHasTarget }></div>
      <div class="sensor"><Light width="36" height="36" /></div>
      <div class="distance">{ launcherDistanceSensorValue ?? "" }</div>
    </div>
    <div class="level">
      <div class="sensor"><LightFilled width="36" height="36" /></div>
      <div class="beam" class:active={ !intakeDistanceSensorHasTarget }></div>
      <div class="sensor"><Light width="36" height="36" /></div>
    </div>
    <div 
      class="note"
      class:active= { intakeDistanceSensorHasTarget || launcherDistanceSensorHasTarget } 
      class:bottom={ intakeDistanceSensorHasTarget }
      class:middle={ launcherDistanceSensorHasTarget && !intakeIsAlignedForLaunch }
      class:top={ launcherDistanceSensorHasTarget && intakeIsAlignedForLaunch }>
    </div>
  </div>
  <div class="motors">
    <div 
      class="belts"
      class:active={ intakeSpeed > 0 || intakeSpeed < 0 }
      class:front={ intakeSpeed > 0 }
      class:rear={ intakeSpeed < 0 }>
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
    gap: 3em;

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
          width: 240px;
          height: 2px;
          background: var(--app-color-charcoal);
          opacity: 0;

          &.active { opacity: 1; }
        }

        & .distance {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: center;
          font-size: 150%;
          z-index: 1;
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
        &.bottom { bottom: 0.25em; }
        &.middle { bottom: 2.75em; }
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