<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let elevatorLowerStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/LowerStage/Position")?.value as number);
  let elevatorUpperStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/UpperStage/Position")?.value as number);
  let armPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/Position")?.value as number);
  let isElevatorAlignedToPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/IsAlignedToPosition")?.value as boolean);
  let isArmAlignedToPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/IsAlignedToPosition")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isElevatorAlignedToPosition && isArmAlignedToPosition }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="mechanisms">
    <div class="elevator">
      <div 
        class="lowerStage"
        style:transform={ `translateY(${ -elevatorLowerStagePosition * 3 }px)` }>
        <div class="info">{ elevatorLowerStagePosition?.toFixed(2) }</div>
        <div 
          class="upperStage"
          style:transform={ `translateY(${ -elevatorUpperStagePosition * 6 }px)` }>
          <div class="info">{ elevatorUpperStagePosition?.toFixed(2) }</div>
        </div>
      </div>
    </div>
    <div class="arm">
      <div 
        class="stage"
        style:transform={ `translateY(${ (-elevatorUpperStagePosition * 9.2) + 100 }px) rotate(${ (armPosition * 2.5) + 190 }deg)` }>
        <div 
          class="info"
          style:transform={ `rotate(${ (-armPosition * 2.5) + 170 }deg)` }>
          { armPosition?.toFixed(2) }
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
      gap: 5em;
      margin-bottom: 6em;

      & .elevator {
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

          & .info {
            position: absolute;
            left: 135px;
            bottom: -25px;
            width: 140px;
            font-size: 200%;
            text-align: left;
          }

          & .upperStage {
            width: 90%;
            height: 20px;
            margin-bottom: 1px;
            background: var(--app-color-pink);

            & .info {
              position: absolute;
              left: -175px;
              bottom: -10px;
              width: 140px;
              font-size: 200%;
              text-align: right;
            }
          }
        }
      }

      & .arm {
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
          width: 20px;
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
          }
        }
      }
    }
  }
</style>