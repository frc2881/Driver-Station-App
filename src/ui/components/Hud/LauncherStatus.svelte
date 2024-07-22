<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { type ChartOptions, GaugeChart, ScaleTypes } from "@carbon/charts-svelte";

  export let launcherArmPosition: number;
  export let launcherArmIsAlignedToTarget: boolean;
  export let launcherRollersTopSpeedDelta: number;
  export let launcherRollersBottomSpeedDelta: number;
  export let launcherRollersIsLaunchReady: boolean;

  const ANGLE_SCALE: number = 2;

  const launcherRollersGaugeOptions: ChartOptions = {
    toolbar: { enabled: false },
    legend: { enabled: false },
    theme: "g100",
    height: "120px",
    gauge: { type: "full", arcWidth: 8 },
    color: { scale: { "value": "#FF69B4" } }
  };

  let launcherRollersSpeedDeltaGaugeData: any = { top: [{ group: "value", value: 0 }], bottom: [{ group: "value", value: 0 }]};
  $: {
    launcherRollersSpeedDeltaGaugeData.top[0].value = launcherRollersTopSpeedDelta;
    launcherRollersSpeedDeltaGaugeData.bottom[0].value = launcherRollersBottomSpeedDelta;
  }
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ launcherArmIsAlignedToTarget && launcherRollersIsLaunchReady }>
    <CheckmarkFilled width=540 height=540 fill="#00CC00" />
  </div>
  <div class="launcher">
    <div class="arm">
      <div class="angle" style:transform={ `rotate(${ -((launcherArmPosition + 8) * ANGLE_SCALE) }deg)` }></div>
      <div class="position">{ launcherArmPosition?.toFixed(2) ?? 0 }</div>
    </div>
    <div class="rollers">
      <GaugeChart data={ launcherRollersSpeedDeltaGaugeData.top } options={ launcherRollersGaugeOptions } />
      <GaugeChart data={ launcherRollersSpeedDeltaGaugeData.bottom } options={ launcherRollersGaugeOptions } />
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

    & .launcher {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2em;

      & .arm {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-top: 9em;

        & .angle {
          width: 150px;
          height: 30px;
          background: var(--app-color-pink);
          transform-origin: 0 0;
          margin-left: 2em;
          border-radius: 8px;
        }

        & .position {
          font-size: 200%;
        }
      }

      & .rollers {
        width: 120px;
        display: flex;
        flex-direction: column;
        gap: 2em;
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