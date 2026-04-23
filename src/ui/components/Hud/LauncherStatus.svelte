<script lang="ts">
  import { CheckmarkFilled } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isTurretAtTargetHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/IsAtTargetHeading")?.value ?? false as boolean);
  let isLauncherAtTargetSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/IsAtTargetSpeed")?.value ?? false as boolean);
  let turretHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/Heading")?.value ?? 0 as number);
  let launcherSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/Speed")?.value ?? 0 as number);

  let activeTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ActiveTarget")?.value ?? "" as string);
  let isActiveTargetEngaged = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/IsActiveTargetEngaged")?.value ?? false as boolean);
  let isActiveTargetInRange = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/IsActiveTargetInRange")?.value ?? true as boolean);
  let activeTargetInfoDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ActiveTargetInfo/Distance")?.value ?? 0 as number);
  let activeTargetInfoHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ActiveTargetInfo/Heading")?.value ?? 0 as number);
  let activeTargetInfoSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ActiveTargetInfo/Speed")?.value ?? 0 as number);
  let activeTargetInfoIsDistanceValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ActiveTargetInfo/IsDistanceValid")?.value ?? false as boolean);
  let activeTargetInfoIsHeadingValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ActiveTargetInfo/IsHeadingValid")?.value ?? false as boolean);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isActiveTargetInRange && isTurretAtTargetHeading && isLauncherAtTargetSpeed }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="info">
    <div class="value" class:active={ isActiveTargetInRange && isTurretAtTargetHeading } class:invalid={ !isActiveTargetInRange }>{ turretHeading.toFixed(1) } &deg;</div>
    <div class="value" class:active={ isLauncherAtTargetSpeed }>{ (launcherSpeed * 100).toFixed(1) } %</div>
  </div>
  <div class="targeting">
    <div class="row header">
      <div class="target">Target</div>
      <div>Distance</div>
      <div>Heading</div>
      <div>Speed</div>
    </div>
    <div class="row">
      <div class="target" class:engaged={ isActiveTargetEngaged }>{ activeTarget || "------------" }</div>
      <div class:invalid={ activeTarget && !activeTargetInfoIsDistanceValid }>{ activeTargetInfoDistance.toFixed(2) } m</div>
      <div class:invalid={ activeTarget && !activeTargetInfoIsHeadingValid }>{ activeTargetInfoHeading.toFixed(1) } &deg;</div>
      <div>{ (activeTargetInfoSpeed * 100).toFixed(1) } %</div>
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
      opacity: 0.5;
      &.active { display: flex; }
      & .checkmark { animation: pulse 500ms infinite ease-out; }
    }

    & .info {
      display: flex;
      flex-direction: column;
      gap: 1em;

      & .value {
        width: 360px;
        font-size: 5rem;
        text-align: right;
        padding: 10px 20px;
        border-radius: 10px;

        &.active {
          border: 3px solid var(--app-color-green);
        }

        &.invalid {
          background-color: var(--app-color-red);
          animation: pulse 500ms infinite ease-out;
        }
      }
    }

    & .targeting {
      display: table;
      border-collapse: separate;
      border-spacing: 10px;
      margin-top: 3em;
      font-size: 1rem;

      & .row {
        display: table-row;

        &.header {
          & div {
            border-bottom: 1px solid var(--app-color-charcoal);
            padding-bottom: .5em;
            color: var(--app-color-smoke);
            font-size: .9rem;
            border-radius: 0;
          }
        }

        & div {
          display: table-cell;
          padding: .5em .5em .25em .5em;
          text-align: right;
          width: 6rem;
          border-radius: 5px;

          &.target {
            text-align: left;
            width: 8rem;
          }

          &.engaged {
            background-color: var(--app-color-silver);
            color:  var(--app-color-black);
            animation: pulse 500ms infinite ease-out;
          }

          &.invalid {
            background-color: var(--app-color-red);
          }
        }
      }
    }
  }
</style>