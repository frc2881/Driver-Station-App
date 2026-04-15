<script lang="ts">
  import { CheckmarkFilled } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let activeTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ActiveTarget")?.value ?? "" as string);
  let isTurretAtTargetHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/IsAtTargetHeading")?.value ?? false as boolean);
  let isLauncherAtTargetSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/IsAtTargetSpeed")?.value ?? false as boolean);
  let turretHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/Heading")?.value ?? 0 as number);
  let launcherSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/Speed")?.value ?? 0 as number);

  let hubDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Distance")?.value ?? 0 as number);
  let hubHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Heading")?.value ?? 0 as number);
  let hubSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Speed")?.value ?? 0 as number);
  let isHubDistanceValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/IsDistanceValid")?.value ?? false as boolean);
  let isHubHeadingValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/IsHeadingValid")?.value ?? false as boolean);

  let shuttleLeftDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Distance")?.value ?? 0 as number);
  let shuttleLeftHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Heading")?.value ?? 0 as number);
  let shuttleLeftSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Speed")?.value ?? 0 as number);
  let isShuttleLeftDistanceValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/IsDistanceValid")?.value ?? false as boolean);
  let isShuttleLeftHeadingValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/IsHeadingValid")?.value ?? false as boolean);

  let shuttleRightDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Distance")?.value ?? 0 as number);
  let shuttleRightHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Heading")?.value ?? 0 as number);
  let shuttleRightSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Speed")?.value ?? 0 as number);
  let isShuttleRightDistanceValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/IsDistanceValid")?.value ?? false as boolean);
  let isShuttleRightHeadingValid = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/IsHeadingValid")?.value ?? false as boolean);

  const isLaunchHeadingValid = (): boolean => {
    switch (activeTarget) {
      case "Hub":
        return isHubHeadingValid;
      case "ShuttleLeft":
        return isShuttleLeftHeadingValid;
      case "ShuttleRight":
        return isShuttleRightHeadingValid;
      default:
        return true;
    }
  }
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isLaunchHeadingValid() && isTurretAtTargetHeading && isLauncherAtTargetSpeed }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="info">
    <div class="value" class:active={ isLaunchHeadingValid() && isTurretAtTargetHeading } class:invalid={ !isLaunchHeadingValid() }>{ turretHeading.toFixed(1) } &deg;</div>
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
      <div class="target" class:active={ activeTarget == "Hub" }>Hub</div>
      <div class:invalid={ !isHubDistanceValid }>{ hubDistance.toFixed(2) } m</div>
      <div class:invalid={ !isHubHeadingValid }>{ hubHeading.toFixed(1) } &deg;</div>
      <div>{ (hubSpeed * 100).toFixed(1) } %</div>
    </div>
    <div class="row">
      <div class="target" class:active={ activeTarget == "ShuttleLeft" }>Shuttle Left</div>
      <div class:invalid={ !isShuttleLeftDistanceValid }>{ shuttleLeftDistance.toFixed(2) } m</div>
      <div class:invalid={ !isShuttleLeftHeadingValid }>{ shuttleLeftHeading.toFixed(1) } &deg;</div>
      <div>{ (shuttleLeftSpeed * 100).toFixed(1) } %</div>
    </div>
    <div class="row">
      <div class="target" class:active={ activeTarget == "ShuttleRight" }>Shuttle Right</div>
      <div class:invalid={ !isShuttleRightDistanceValid }>{ shuttleRightDistance.toFixed(2) } m</div>
      <div class:invalid={ !isShuttleRightHeadingValid }>{ shuttleRightHeading.toFixed(1) } &deg;</div>
      <div>{ (shuttleRightSpeed * 100).toFixed(1) } %</div>
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

          &.active {
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