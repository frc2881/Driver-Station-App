<script lang="ts">
  import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
	import { Alliance, Pose2d } from "../../../common";

  export let alliance: Alliance;
  export let robotPose: [number, number, number];
  export let isAlignedToTarget: boolean;
  export let launcherBottomBeamBreakSensorHasTarget: boolean;
  export let launcherTopBeamBreakSensorHasTarget: boolean;

  const PIXELS_PER_METER: number = 29.0123;
  
  let poseInfo: Pose2d = { x: 0, y: 0, rotation: 0 };
  let isReadyForLaunch: boolean = false;

  $: {
    poseInfo.x = robotPose?.[0] ?? 0;
    poseInfo.y = robotPose?.[1] ?? 0;
    poseInfo.rotation = robotPose?.[2] ?? 0;
    
    isReadyForLaunch = 
      isAlignedToTarget &&
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
  <div class="field { alliance?.toLowerCase() }">
    <img src="./assets/field.png" />
    <div 
      class="robot"
      style:left={ `${ poseInfo.x * PIXELS_PER_METER }px` }
      style:bottom={ `${ poseInfo.y * PIXELS_PER_METER }px` }
      style:transform={ `translate(-9px, 6px) rotate(${ -poseInfo.rotation }deg)` }>
      <div class="arrow"><CaretDown width=21 height=21 /></div>
      <div class="line">&nbsp;</div>
    </div>
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
    overflow: hidden;

    .field {
      width: 480px;
      transform: rotate(-90deg);
      
      &.blue { transform: rotate(-90deg); }
      &.red { transform: rotate(90deg); }
      
      img { width: 100%; }

      .robot {
        position: absolute;
        width: 15.84px;
        height: 18.05px;
        background: var(--app-color-pink);
        display: flex;
        align-items: center;
        justify-content: center;

        .arrow {
          transform: rotate(90deg) translateY(16px);
          color: var(--app-color-pink);
        }

        .line {
          width: 1px;
          background: var(--app-color-pink);
          height: 128px;
          transform: rotate(90deg) translateY(96px);
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