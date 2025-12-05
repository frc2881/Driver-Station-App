<script lang="ts">
  import { CheckmarkFilled } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let elevatorLowerStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/LowerStage/RelativePosition")?.value as number);
  let elevatorUpperStagePosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/UpperStage/RelativePosition")?.value as number);
  let armPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/RelativePosition")?.value as number);
  let wristPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Wrist/RelativePosition")?.value as number);
  let isElevatorAtTargetPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Elevator/IsAtTargetPosition")?.value as boolean);
  let isArmAtTargetPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Arm/IsAtTargetPosition")?.value as boolean);
  let isWristAtTargetPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Wrist/IsAtTargetPosition")?.value as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isElevatorAtTargetPosition && isArmAtTargetPosition && isWristAtTargetPosition }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="mechanisms" >
    <table>
      <tbody>
        <tr><td>Elevator (L):</td><td><span class:isAtTargetPosition={ isElevatorAtTargetPosition }>{ elevatorLowerStagePosition?.toFixed(2) ?? "-----" }</span></td></tr>
        <tr><td>Elevator (U):</td><td><span class:isAtTargetPosition={ isElevatorAtTargetPosition }>{ elevatorUpperStagePosition?.toFixed(2) ?? "-----" }</span></td></tr>
        <tr><td>Arm:</td><td><span class:isAtTargetPosition={ isArmAtTargetPosition }>{ armPosition?.toFixed(2) ?? "-----" }</span></td></tr>
        <tr><td>Wrist:</td><td><span class:isAtTargetPosition={ isWristAtTargetPosition }>{ wristPosition?.toFixed(2) ?? "-----" }</span></td></tr>
      </tbody>
    </table>
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
      opacity: 0.5;
      &.active { display: flex; }
      & .checkmark { animation: pulse 500ms infinite ease-out; }
    }

    & .mechanisms {
      display: flex;
      flex-direction: column;
      font-size: 200%;

      & table {
        & td {
          padding: 0 2em 1em 0;
          text-align: right;
        }
      }

      & .isAtTargetPosition {
        color: var(--app-color-green);
        font-weight: bold;
      }
    }
  }
</style>