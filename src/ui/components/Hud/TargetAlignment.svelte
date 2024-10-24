<script lang="ts">
  import { run } from 'svelte/legacy';

  import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
	import { Alliance, type Pose2d } from "../../../common/index.js";

  interface Props {
    alliance: Alliance;
    robotPose: [number, number, number];
    isAlignedToTarget: boolean;
    fieldLength: number;
    fieldWidth: number;
    driveLength: number;
    driveWidth: number;
  }

  let {
    alliance,
    robotPose,
    isAlignedToTarget,
    fieldLength,
    fieldWidth,
    driveLength,
    driveWidth
  }: Props = $props();

  const PIXELS_PER_METER: number = 100;

  let poseInfo: Pose2d = $state({ x: 0, y: 0, rotation: 0 });

  run(() => {
    poseInfo.x = robotPose?.[0] ?? 0;
    poseInfo.y = robotPose?.[1] ?? 0;
    poseInfo.rotation = robotPose?.[2] ?? 0;
  });
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ isAlignedToTarget }>
    <CheckmarkFilled width=540 height=540 fill="#00CC00" />
  </div>
  <div 
    class="field { alliance?.toLowerCase() }" 
    style:width={ `${fieldLength * PIXELS_PER_METER}px` } 
    style:height={`${fieldWidth * PIXELS_PER_METER}px`}>
    <img src="./assets/images/field.png" alt="Field" />
    <div 
      class="robot"
      style:width={ `${driveLength * PIXELS_PER_METER}px` } 
      style:height={`${driveWidth * PIXELS_PER_METER}px`}
      style:transform={ `translate(${ (poseInfo.x * PIXELS_PER_METER) - (driveLength * PIXELS_PER_METER ) / 2 }px, ${ -(poseInfo.y * PIXELS_PER_METER) + (driveWidth * PIXELS_PER_METER) / 2 }px) rotate(${ -poseInfo.rotation }deg)` }>
      <div class="line"></div>
      <div class="front"><CaretDown width=64 height=64 /></div>
    </div>
  </div>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    & .field {
      position: relative;
      box-sizing: border-box;
      transform: scale(25%);

      &.blue { transform: rotate(-90deg) translateX(13.5%) scale(55%); }
      &.red { transform: rotate(90deg) translateX(-13.5%) scale(55%); }

      & .robot {
        position: absolute;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        background-color: var(--app-color-pink);
        border-radius: 8px;

        & .line {
          position: absolute;
          box-sizing: border-box;
          top: 50%;
          left: 50%;
          width: 640px;
          height: 2px;
          transform: translateX(-107%) translateY(-2px) rotate(-6deg);
          transform-origin: 100%;
          border: 2px dashed var(--app-color-white);
        }

        & .front {
          position: absolute;
          box-sizing: border-box;
          top: 50%;
          left: 50%;
          transform: rotate(-90deg) translate(50%, 33%);
          color: var(--app-color-white);
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