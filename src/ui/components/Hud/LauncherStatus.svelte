<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let launcherArmPosition: number;
  export let launcherArmIsAlignedToTarget: boolean;
  export let launcherRollersTopSpeedDelta: number;
  export let launcherRollersBottomSpeedDelta: number;
  export let launcherRollersIsLaunchReady: boolean;
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ launcherArmIsAlignedToTarget && launcherRollersIsLaunchReady }>
    <CheckmarkFilled width=540 height=540 fill="#00CC00" />
  </div>
  <div style="position:absolute;top:0;right:0;width:80px;margin:2em;text-align:right;font-size:200%;">
    <div>{ (launcherRollersTopSpeedDelta * 100).toFixed(1) }%</div>
    <hr/>
    <div>{ (launcherRollersBottomSpeedDelta * 100).toFixed(1) }%</div>
  </div>
  <div class="launcher">
    <div class="leadscrew">
      <div class="position">{ launcherArmPosition?.toFixed(2) ?? 0 }</div>
    </div>
    <div 
      class="arm"
      style:transform={ `rotate(${ -((launcherArmPosition + 8) * 2) }deg)` }>
      <div class="pitch">&nbsp;</div>
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
      position: relative;
      margin: 8em 4em 0 0;

      & .leadscrew {
        display: flex;
        align-items: flex-end;
        position: absolute;
        right: 130px;
        top: -40px;
        height: 240px;
        width: 10px;
        background: var(--app-color-charcoal);
        transform: rotate(-10deg);

        & .position {
          display: flex;
          flex: 1 0 auto;
          justify-content: center;
          width: 80px;
          transform: translate(-1.5em, 2em) rotate(10deg);
          font-size: 250%;
        }
      }

      & .arm {
        margin: 8em 4em 0 0;
        border-top: 40px solid transparent;
        border-bottom: 40px solid transparent; 
        border-right:180px solid var(--app-color-pink);
        transform-origin: 0 0;

        & .pitch {
          padding: 1em;
          font-size: 150%;
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