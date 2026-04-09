<script lang="ts">
  import { CheckmarkFilled } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isTurretAtTargetHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/IsAtTargetHeading")?.value ?? false as boolean);
  let isLauncherAtTargetSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/IsAtTargetSpeed")?.value ?? false as boolean);
  let turretHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/Heading")?.value ?? 0 as number);
  let launcherSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/Speed")?.value ?? 0 as number);

  let distanceMin = $derived(nt.topics.get("/SmartDashboard/Targeting/DistanceMin")?.value ?? 0 as number);
  let distanceMax = $derived(nt.topics.get("/SmartDashboard/Targeting/DistanceMax")?.value ?? 0 as number);
  let headingMin = $derived(nt.topics.get("/SmartDashboard/Targeting/HeadingMin")?.value ?? 0 as number);
  let headingMax = $derived(nt.topics.get("/SmartDashboard/Targeting/HeadingMax")?.value ?? 0 as number);

  let hubDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Distance")?.value ?? 0 as number);
  let hubSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Speed")?.value ?? 0 as number);
  let hubHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Heading")?.value ?? 0 as number);

  let shuttleLeftDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Distance")?.value ?? 0 as number);
  let shuttleLeftSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Speed")?.value ?? 0 as number);
  let shuttleLeftHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Heading")?.value ?? 0 as number);

  let shuttleRightDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Distance")?.value ?? 0 as number);
  let shuttleRightSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Speed")?.value ?? 0 as number);
  let shuttleRightHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Heading")?.value ?? 0 as number);

  const isValidDistance = (distance: number): boolean => {
    return distance >= distanceMin && distance <= distanceMax;
  }

  const isValidHeading = (heading: number): boolean => {
    return heading >= headingMin && heading <= headingMax;
  }
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isTurretAtTargetHeading && isLauncherAtTargetSpeed }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="info">
    <div class="value" class:active={ isTurretAtTargetHeading }>{ turretHeading.toFixed(1) } &deg;</div>
    <div class="value" class:active={ isLauncherAtTargetSpeed }>{ (launcherSpeed * 100).toFixed(1) } %</div>
  </div>
  <div class="targeting">
    <div class="row header">
      <div class="target">Target</div>
      <div>Distance</div>
      <div>Speed</div>
      <div>Heading</div>
    </div>
    <div class="row">
      <div class="target">Hub</div>
      <div class:invalid={ isValidDistance(hubDistance) }>{ hubDistance.toFixed(2) } m</div>
      <div>{ (hubSpeed * 100).toFixed(1) } %</div>
      <div class:invalid={ isValidHeading(hubHeading) }>{ hubHeading.toFixed(1) } &deg;</div>
    </div>
    <div class="row">
      <div class="target">Shuttle Left</div>
      <div class:invalid={ isValidDistance(shuttleLeftDistance) }>{ shuttleLeftDistance.toFixed(2) } m</div>
      <div>{ (shuttleLeftSpeed * 100).toFixed(1) } %</div>
      <div class:invalid={ isValidHeading(shuttleLeftHeading) }>{ shuttleLeftHeading.toFixed(1) } &deg;</div>
    </div>
    <div class="row">
      <div class="target">Shuttle Right</div>
      <div class:invalid={ isValidDistance(shuttleRightDistance) }>{ shuttleRightDistance.toFixed(2) } m</div>
      <div>{ (shuttleRightSpeed * 100).toFixed(1) } %</div>
      <div class:invalid={ isValidHeading(shuttleRightHeading) }>{ shuttleRightHeading.toFixed(1) } &deg;</div>
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

        &.active {
          border: 3px solid var(--app-color-green);
        }
      }
    }

    & .targeting {
      display: table;
      border-collapse: separate;
      border-spacing: 0 5px;
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
          }
        }

        & div {
          display: table-cell;
          padding: .5em .5em .25em .5em;
          text-align: right;
          width: 6rem;

          &.target {
            text-align: left;
            width: 8rem;
          }

          &.invalid {
            background-color: var(--app-color-red);
          }
        }
      }
    }
  }
</style>