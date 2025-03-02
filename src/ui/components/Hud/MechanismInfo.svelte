<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let elevatorLowerStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/LowerStage/Position")?.value as number);
  let elevatorUpperStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/UpperStage/Position")?.value as number);
  let armPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/Position")?.value as number);
  let wristPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Wrist/Position")?.value as string);
  let isElevatorAlignedToPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/IsAlignedToPosition")?.value as boolean);
  let isArmAlignedToPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/IsAlignedToPosition")?.value as boolean);
  let isWristAlignedToPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Wrist/IsAlignedToPosition")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isElevatorAlignedToPosition && isArmAlignedToPosition && isWristAlignedToPosition }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div 
    class="mechanisms" 
    style:transform={ `translateY(${ -elevatorLowerStagePosition * 3 }px)` }>
    <div class="elevator">
      <div class="lowerStage">
        <span class="label">Elevator</span>
        <div class="info"><span class="label">Lower</span><span class:enabled={ isElevatorAlignedToPosition }>{ elevatorLowerStagePosition?.toFixed(2) }</span></div>
        <div 
          class="upperStage"
          style:transform={ `translateY(${ -elevatorUpperStagePosition * 6 }px)` }>
          <div class="info"><span class="label">Upper</span><span class:enabled={ isElevatorAlignedToPosition }>{ elevatorUpperStagePosition?.toFixed(2) }</span></div>
        </div>
      </div>
    </div>
    <div class="arm">
      <div 
        class="stage"
        style:transform={ `translateY(${ (-elevatorUpperStagePosition * 6) + 100 }px) rotate(${ (armPosition * 2.5) + 190 }deg)` }>
        <div 
          class="info"
          style:transform={ `rotate(${ (-armPosition * 2.5) + 170 }deg)` }>
          <span class="label">Arm+Wrist</span><span class:enabled={ isArmAlignedToPosition }>{ armPosition?.toFixed(2) }</span>
          <div class="wrist" class:enabled={ isWristAlignedToPosition }>{ wristPosition == "Unknown" ? "?" : wristPosition  }</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
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

    & .mechanisms {
      display: flex;
      flex-direction: row;
      gap: 6em;
      margin-bottom: 6em;

      & .label {
        position: absolute;
        top: -25px;
        width: 100%;
        font-size: 16px;
        text-align: left;
        color: var(--app-color-smoke);
      }

      & .enabled {
        color: var(--app-color-green);
      }

      & .elevator {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        margin-bottom: 5em;

        & .lowerStage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 130px;
          height: 216px;
          border: 10px solid var(--app-color-pink);

          & > .label {
            top: -35px;
          }

          & .info {
            position: absolute;
            left: -170px;
            bottom: -25px;
            width: 140px;
            font-size: 200%;
            text-align: right;
          }

          & .upperStage {
            width: 90%;
            height: 20px;
            margin-bottom: 1px;
            background: var(--app-color-pink);

            & .info {
              position: absolute;
              left: 130px;
              bottom: -5px;
              width: 140px;
              font-size: 200%;
              text-align: left;
            }
          }
        }
      }

      & .arm {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100%;

        & .stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 15px;
          height: 120px;
          margin-right: 2em;
          background: var(--app-color-pink);
          transform-origin: 20px 0px;

          & .info {
            position: absolute;
            left: 35px;
            bottom: 0px;
            font-size: 200%;
            text-align: left;

            & .wrist {
              margin-top: 3px;
              font-size: 75%;
              text-align: center;
              text-transform: uppercase;
            }
          }
        }
      }
    }
  }
</style>