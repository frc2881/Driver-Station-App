<script lang="ts">
  import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
	import { Alliance, type Pose2d, Utils } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let alliance = $derived(nt.topics.get("/SmartDashboard/Game/Alliance")?.value as Alliance);
  let robotPose = $derived(nt.topics.get("/SmartDashboard/Robot/Localization/Pose")?.value as any);
  let fieldLength = $derived(nt.topics.get("/SmartDashboard/Game/Field/Length")?.value as number);
  let fieldWidth = $derived(nt.topics.get("/SmartDashboard/Game/Field/Width")?.value as number);
  let driveLength = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Chassis/Length")?.value as number);
  let driveWidth = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Chassis/Width")?.value as number);
  let isAlignedToTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/IsAlignedToTarget")?.value as boolean);

  const PIXELS_PER_METER: number = 100;

  const targetZones: Record<Alliance, Record<string, { x: number, y: number, distance: number }>> = {
    [Alliance.Blue]: {
      "reef": { x: 4.500, y: 4.050, distance: 2.5 },
      "coralStationLeft": { x: 0.85, y: 7.40, distance: 1.5 },
      "coralStationRight": { x: 0.85, y: 0.66, distance: 1.5 },
      "processor": { x: 5.99, y: -0.01, distance: 1.0 },
      "barge": { x: 8.27, y: 6.14, distance: 1.5 }
    },
    [Alliance.Red]: {
      "reef": { x: 13.045, y: 4.050, distance: 2.5 },
      "coralStationLeft": { x: 16.70, y: 0.66, distance: 1.5 },
      "coralStationRight": { x: 16.70, y: 7.40, distance: 1.5 },
      "processor": { x: 11.56, y: 8.06, distance: 1.0 },
      "barge": { x: 9.28, y: 1.91, distance: 1.5 }
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
    style:width={ `${fieldLength * PIXELS_PER_METER}px` } 
    style:height={`${fieldWidth * PIXELS_PER_METER}px`}>
    <img src="./assets/images/field.png" alt="Field" />
    <div 
      class="robot"
      style:width={ `${driveLength * PIXELS_PER_METER}px` } 
      style:height={`${driveWidth * PIXELS_PER_METER}px`}
      style:transform={ `translate(${ (robotPose_?.x * PIXELS_PER_METER) - (driveLength * PIXELS_PER_METER ) / 2 }px, ${ -(robotPose_?.y * PIXELS_PER_METER) + (driveWidth * PIXELS_PER_METER) / 2 }px) rotate(${ -robotPose_?.rotation }deg)` }>
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
        transform: rotate(-90deg) translateX(13.5%) scale(55%);
        &.reef { transform: rotate(-90deg) translateX(27.0%) scale(110%); }
        &.coralStationLeft { transform: rotate(-90deg) translateX(42.5%)  translateY(27.0%) scale(110%); }
        &.coralStationRight { transform: rotate(-90deg) translateX(42.5%)  translateY(-27.0%) scale(110%); }
        &.processor { transform: rotate(-90deg) translateX(17.5%)  translateY(-27.0%) scale(110%); }
        &.barge { transform: rotate(-90deg) translateX(7.5%) translateY(27.0%) scale(110%); }
      }
      &.red { 
        transform: rotate(90deg) translateX(-13.5%) scale(55%); 
        &.reef { transform: rotate(90deg) translateX(-27.0%) scale(110%); }
        &.coralStationLeft { transform: rotate(90deg) translateX(-42.5%) translateY(-27.0%) scale(110%); }
        &.coralStationRight { transform: rotate(90deg) translateX(-42.5%) translateY(27.0%) scale(110%); }
        &.processor { transform: rotate(90deg) translateX(-17.5%) translateY(27.0%) scale(110%); }
        &.barge { transform: rotate(90deg) translateX(-7.5%) translateY(-27.0%) scale(110%); }
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
          width: 140px;
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
          transform: rotate(-90deg) translate(50%, 25%);
          color: var(--app-color-white);
        }
      }
    }
  }
</style>