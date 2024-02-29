<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let launcherArmIsAlignedToTarget: boolean;
  export let launcherBottomBeamBreakSensorHasTarget: boolean;
  export let launcherTopBeamBreakSensorHasTarget: boolean;
  export let launcherArmPosition: number;
  export let targetPitch: number;

  let isLauncherAligned: boolean = false;

  $: {
    isLauncherAligned = 
      launcherBottomBeamBreakSensorHasTarget && 
      launcherTopBeamBreakSensorHasTarget && 
      launcherArmIsAlignedToTarget;
  }
</script>

<div class="main">
  <div class="launcher">
    <div class="leadscrew">
      <div class="position">{ launcherArmPosition?.toFixed(2) }</div>
    </div>
    <div 
      class="arm"
      style:transform={ `rotate(${ -targetPitch }deg)` }>
      <div class="pitch">{ targetPitch?.toFixed(2) } &deg;</div>
    </div>
  </div>
  <div 
    class="alignment"
    class:active={ isLauncherAligned }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
  </div>
</div>

<style lang="postcss">
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .launcher {
      position: relative;
      margin: 8em 4em 0 0;

      .leadscrew {
        display: flex;
        align-items: flex-end;
        position: absolute;
        right: 130px;
        top: -40px;
        height: 240px;
        width: 10px;
        background: var(--app-color-charcoal);
        transform: rotate(-10deg);

        .position {
          display: flex;
          flex: 1 0 auto;
          justify-content: center;
          width: 80px;
          transform: translate(-1.5em, 2em);
          font-size: 150%;
        }
      }

      .arm {
        margin: 8em 4em 0 0;
        border-top: 40px solid transparent;
        border-bottom: 40px solid transparent; 
        border-right:180px solid var(--app-color-pink);
        transform-origin: 0 0;

        .pitch {
          padding: 1em;
          font-size: 150%;
        }
      }
    }

    .alignment {
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0.75;
      animation: pulse 500ms infinite ease;

      &.active {
        display: flex;
      }
    }
  }

  @keyframes pulse {
    0% { opacity: 0.75; }
    100% { opacity: 0.25; }
  }
</style>