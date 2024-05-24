<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let launcherArmIsAlignedToTarget: boolean;
  export let launcherArmPosition: number;
  export let launcherBottomBeamBreakSensorHasTarget: boolean;
  export let launcherTopBeamBreakSensorHasTarget: boolean;

  let isReadyForLaunch: boolean = false;

  $: {
    isReadyForLaunch = 
      launcherArmIsAlignedToTarget &&
      launcherBottomBeamBreakSensorHasTarget && 
      !launcherTopBeamBreakSensorHasTarget;
  }
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ isReadyForLaunch }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
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

      &.active {
        display: flex;
      }
    }
  }

  @keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 0.1; }
  }
</style>