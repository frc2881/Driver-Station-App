<script lang="ts">
  import { CheckmarkFilled, CaretDown } from "carbon-icons-svelte";
	import { Alliance, type Pose2d, Utils } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let alliance = $derived(nt.topics.get("/SmartDashboard/Game/Alliance")?.value as Alliance);
  let robotPose = $derived(nt.topics.get("/SmartDashboard/Robot/Localization/Pose")?.value as any);
  let fieldLength = $derived(Math.ceil((nt.topics.get("/SmartDashboard/Game/Field/Length")?.value as number) * 100) / 100);
  let fieldWidth = $derived(Math.ceil((nt.topics.get("/SmartDashboard/Game/Field/Width")?.value as number) * 100) / 100);
  let robotLength = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Chassis/Length")?.value as number);
  let robotWidth = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Chassis/Width")?.value as number);
  let isAlignedToTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/IsAlignedToTarget")?.value as boolean);

  const PIXELS_PER_METER: number = 100;
  const FIELD_BUFFER_PIXELS: number = 51;

  const targetZones: Record<Alliance, Record<string, { x: number, y: number, distance: number }>> = {
    [Alliance.Blue]: {
      "tower": { x: 1.225, y: 3.750, distance: 1.0 }
    },
    [Alliance.Red]: {
      "tower": { x: 15.300, y: 4.325, distance: 1.0 }
    }
  };

  const getTargetZone = (robotPose: Pose2d): string | null => {
    if (robotPose.x > 0 || robotPose.y > 0) {
      for (const targetKey in targetZones[alliance]) {
        const { x, y, distance } = targetZones[alliance][targetKey] as { x: number, y: number, distance: number };
        if (Utils.getDistance(robotPose, { x, y, rotation: 0 }) < distance) {
          return targetKey;
        }
      }
    }
    return null;
  }

  let robotPose_: Pose2d = $derived(Utils.decodePose2dFromStruct(robotPose));
  let targetZone: string | null = $derived(getTargetZone(robotPose_));
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isAlignedToTarget }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div 
    class="field { alliance?.toLowerCase() } { targetZone }"
    style:width={ `${(fieldLength * PIXELS_PER_METER) + (FIELD_BUFFER_PIXELS * 2)}px` } 
    style:height={`${(fieldWidth * PIXELS_PER_METER) + (FIELD_BUFFER_PIXELS * 2)}px`}>
    <img src="./assets/images/field.png" alt="Field" />
    <div 
      class="robot"
      style:width={ `${robotLength * PIXELS_PER_METER}px` } 
      style:height={`${robotWidth * PIXELS_PER_METER}px`}
      style:transform={ `translate(${ ((robotPose_?.x * PIXELS_PER_METER) + FIELD_BUFFER_PIXELS) - (robotLength * PIXELS_PER_METER ) / 2 }px, ${ -((robotPose_?.y * PIXELS_PER_METER) + FIELD_BUFFER_PIXELS) + (robotWidth * PIXELS_PER_METER) / 2 }px) rotate(${ -robotPose_?.rotation }deg)` }>
      <div class="line"></div>
      <div class="front"><CaretDown width=64 height=64 /></div>
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
    overflow: hidden;

    & .alignment {
      position: absolute;
      display: none;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      opacity: 0.75;
      &.active { display: flex; }
      & .checkmark { animation: pulse 500ms infinite ease-out; }
    }

    & .field {
      position: relative;
      box-sizing: border-box;
      transform: scale(25%);
      transition: transform 500ms ease-in-out;

      &.blue { 
        transform: rotate(-90deg) translateX(11%) scale(50%);
        &.tower { transform: rotate(-90deg) translateX(32.5%) scale(100%); }
      }
      &.red { 
        transform: rotate(90deg) translateX(-11%) scale(50%); 
        &.tower { transform: rotate(90deg) translateX(-32.5%) scale(100%); }
      }

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
          width: 100px;
          height: 2px;
          transform: translateX(-100%) translateY(-2px) rotate(180deg);
          transform-origin: 100%;
          border: 2px dashed var(--app-color-white);
          opacity: 0.75;
        }

        & .front {
          position: absolute;
          box-sizing: border-box;
          top: 50%;
          left: 50%;
          transform: rotate(-90deg) translate(50%, 0%);
          color: var(--app-color-white);
          opacity: 0.5;
        }
      }
    }
  }
</style>