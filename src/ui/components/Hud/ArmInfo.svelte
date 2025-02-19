<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let armPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/Position/Current")?.value as number);
  let upperStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/UpperStage/Position/Current")?.value as number);
  let isAlignedToPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/IsAlignedToPosition")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isAlignedToPosition }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="arm">
    <div 
      class="stage"
      style:transform={ `translateY(${ -upperStagePosition * 3 }px) rotate(${ (-armPosition * 3) + 190 }deg)` }>
      <div 
        class="info"
        style:transform={ `rotate(${ (armPosition * 3) + 170 }deg)` }>
        { armPosition?.toFixed(2) }
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

    & .arm {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      margin-bottom: 5em;

      & .stage {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        width: 20px;
        height: 150px;
        margin-right: 2em;
        background: var(--app-color-pink);
        transform-origin: 20px 0px;

        & .info {
          position: absolute;
          left: 40px;
          bottom: 0px;
          font-size: 250%;
          text-align: left;
        }
      }
    }
  }
</style>