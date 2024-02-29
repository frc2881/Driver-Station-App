<script lang="ts">
  import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
	import { Alliance, Pose2d, PoseInfo, Utils } from "../../../common";

  export let alliance: Alliance;
  export let robotPose: string;
  export let targetYaw: number;
  export let launcherBottomBeamBreakSensorHasTarget: boolean;
  export let launcherTopBeamBreakSensorHasTarget: boolean;

  const PIXELS_PER_METER: number = 29.0123;
  
  const poseInfo: PoseInfo = { x: 0, y: 0, rotation: 0 };
  let isLauncherAligned: boolean = false;

  $: {
    const __pose = JSON.parse(robotPose ?? "{}") as Pose2d;
    poseInfo.x = typeof(__pose.translation?.x) === "number" ? __pose.translation?.x ?? 0 : 0;
    poseInfo.y = typeof(__pose.translation?.y) === "number" ? __pose.translation?.y ?? 0 : 0;
    poseInfo.rotation = Utils.radiansToDegrees(typeof(__pose.rotation?.radians) === "number" ? __pose?.rotation?.radians ?? 0 : 0);

    isLauncherAligned = 
      launcherBottomBeamBreakSensorHasTarget && 
      launcherTopBeamBreakSensorHasTarget && 
      Math.abs(targetYaw - poseInfo.rotation) < 3.0;
  }
</script>

<div class="main">
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
  <div 
    class="aligned"
    class:active={ isLauncherAligned }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
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

    .aligned {
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