<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let lowerStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/LowerStage/Position/Current")?.value as number);
  let upperStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/UpperStage/Position/Current")?.value as number);
  let isAlignedToPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/IsAlignedToPosition")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isAlignedToPosition }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="elevator">
    <div 
      class="lowerStage"
      style:transform={ `translateY(${ -lowerStagePosition * 6 }px)` }>
      <div class="info">{ lowerStagePosition?.toFixed(2) }</div>
      <div 
        class="upperStage"
        style:transform={ `translateY(${ -upperStagePosition * 6 }px)` }>
        <div class="info">{ upperStagePosition?.toFixed(2) }</div>
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
      opacity: 0.25;
      &.active { display: flex; }
      & .checkmark { animation: pulse 500ms infinite ease-out; }
    }

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
          left: -185px;
          bottom: -25px;
          width: 140px;
          font-size: 250%;
          text-align: right;
        }

        & .upperStage {
          width: 90%;
          height: 20px;
          margin-bottom: 1px;
          background: var(--app-color-pink);

          & .info {
            position: absolute;
            left: 150px;
            bottom: -5px;
            width: 140px;
            font-size: 250%;
            text-align: left;
          }
        }
      }
    }
  }
</style>