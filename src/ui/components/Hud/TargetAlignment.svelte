<script lang="ts">
  import { CheckmarkFilled, CaretDown } from "carbon-icons-svelte";
	import { Alliance, type Pose2d, Utils } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let alliance = $derived(nt.topics.get("/Telemetry/Match/Alliance")?.value as Alliance);
  let robotPose = $derived(nt.topics.get("/Telemetry/Robot/Services/Localization/Pose")?.value as any);
  let fieldLength = $derived(Math.ceil((nt.topics.get("/Telemetry/Game/Field/Length")?.value as number) * 100) / 100);
  let fieldWidth = $derived(Math.ceil((nt.topics.get("/Telemetry/Game/Field/Width")?.value as number) * 100) / 100);
  let robotLength = $derived(nt.topics.get("/Telemetry/Robot/Subsystems/Drive/Bumper/Length")?.value as number);
  let robotWidth = $derived(nt.topics.get("/Telemetry/Robot/Subsystems/Drive/Bumper/Width")?.value as number);
  let isAlignedToTargetPose = $derived(nt.topics.get("/Telemetry/Robot/Subsystems/Drive/IsAlignedToTargetPose")?.value as boolean);
  let isAlignedToTargetHeading = $derived(nt.topics.get("/Telemetry/Robot/Subsystems/Drive/IsAlignedToTargetHeading")?.value as boolean);

  const PIXELS_PER_METER: number = 100;
  const FIELD_BUFFER_PIXELS: number = 51;

  let robotPose_: Pose2d = $derived(Utils.decodePose2dFromStruct(robotPose));
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isAlignedToTargetPose || isAlignedToTargetHeading }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div 
    class="field { alliance?.toLowerCase() }"
    style:width={ `${(fieldLength * PIXELS_PER_METER) + (FIELD_BUFFER_PIXELS * 2)}px` } 
    style:height={`${(fieldWidth * PIXELS_PER_METER) + (FIELD_BUFFER_PIXELS * 2)}px`}>
    <img src="./assets/images/field.png" alt="Field" />
    <div 
      class="robot"
      style:width={ `${robotLength * PIXELS_PER_METER}px` } 
      style:height={`${robotWidth * PIXELS_PER_METER}px`}
      style:transform={ `translate(${ ((robotPose_?.x * PIXELS_PER_METER) + FIELD_BUFFER_PIXELS) - (robotLength * PIXELS_PER_METER ) / 2 }px, ${ -((robotPose_?.y * PIXELS_PER_METER) + FIELD_BUFFER_PIXELS) + (robotWidth * PIXELS_PER_METER) / 2 }px) rotate(${ -robotPose_?.rotation }deg)` }>
      <div class="front"><CaretDown width=96 height=96 /></div>
      <div class="launcher">
        <div class="heading"></div>
      </div>
      <div class="intake"></div>
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
      }
      &.red { 
        transform: rotate(90deg) translateX(-11%) scale(50%); 
      }

      & .robot {
        position: absolute;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        border: 6px solid var(--app-color-pink);
        border-radius: 8px;

        & .front {
          position: absolute;
          box-sizing: border-box;
          top: 50%;
          left: 50%;
          transform: rotate(-90deg) translate(50%, 10%);
          color: var(--app-color-white);
          opacity: 0.5;
        }

        & .launcher {
          position: absolute;
          left: calc(50% - 20px);
          top: calc(50% - 10px);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--app-color-pink);

          & .heading {
            position: absolute;
            box-sizing: border-box;
            top: calc(50% - 2px);
            left: calc(50% - 2px);
            width: 600px;
            height: 2px;
            transform-origin: 0;
            border: 2px dashed var(--app-color-white);
            opacity: 0.5;
          }
        }

        & .intake {
          position: absolute;
          right: calc(100% + 19px);
          width: 3px;
          height: 100%;
          background: var(--app-color-pink);
        }
      }
    }
  }
</style>