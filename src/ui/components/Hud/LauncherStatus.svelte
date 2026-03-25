<script lang="ts">
  import { CheckmarkFilled } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isTurretAtTargetHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/IsAtTargetHeading")?.value as boolean);
  let isLauncherAtTargetSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/IsAtTargetSpeed")?.value as boolean);
  let turretHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/Heading")?.value ?? 0 as number);
  let launcherSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/Speed")?.value ?? 0 as number);

  let hubDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Distance")?.value ?? 0 as number);
  let hubSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Speed")?.value ?? 0 as number);
  let hubHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/Hub/Heading")?.value ?? 0 as number);

  let shuttleLeftDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Distance")?.value ?? 0 as number);
  let shuttleLeftSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Speed")?.value ?? 0 as number);
  let shuttleLeftHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleLeft/Heading")?.value ?? 0 as number);

  let shuttleRightDistance = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Distance")?.value ?? 0 as number);
  let shuttleRightSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Speed")?.value ?? 0 as number);
  let shuttleRightHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Targeting/ShuttleRight/Heading")?.value ?? 0 as number);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isTurretAtTargetHeading && isLauncherAtTargetSpeed }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="info">
    <div class="value">{ turretHeading.toFixed(1) } &deg;</div>
    <div class="value">{ (launcherSpeed * 100).toFixed(1) } %</div>
  </div>
  <div class="targeting">
    <div class="row header">
      <div class="target">Target</div>
      <div>Distance</div>
      <div>Speed</div>
      <div>Heading</div>
    </div>
    <div class="row data">
      <div class="target">Hub</div>
      <div>{ hubDistance.toFixed(2) } m</div>
      <div>{ (hubSpeed * 100).toFixed(1) } %</div>
      <div>{ hubHeading.toFixed(1) } &deg;</div>
    </div>
    <div class="row data">
      <div class="target">Shuttle Left</div>
      <div>{ shuttleLeftDistance.toFixed(2) } m</div>
      <div>{ (shuttleLeftSpeed * 100).toFixed(1) } %</div>
      <div>{ shuttleLeftHeading.toFixed(1) } &deg;</div>
    </div>
    <div class="row data">
      <div class="target">Shuttle Right</div>
      <div>{ shuttleRightDistance.toFixed(2) } m</div>
      <div>{ (shuttleRightSpeed * 100).toFixed(1) } %</div>
      <div>{ shuttleRightHeading.toFixed(1) } &deg;</div>
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

    & .info {
      display: flex;
      flex-direction: column;
      gap: 2em;
      margin-right: 2em;
      z-index: 9999;

      & .value {
        width: 360px;
        font-size: 5rem;
        text-align: right;
      }
    }

    & .targeting {
      display: table;
      border-collapse: collapse;
      margin-top: 4em;

      & .row {
        display: table-row;

        &.header {
          & div {
            border-bottom: 1px solid var(--app-color-charcoal);
            padding-bottom: .25em;
          }
        }

        & div {
          display: table-cell;
          padding: .75em .5em 0 .5em;
          text-align: right;
          width: 5rem;

          &.target {
            text-align: left;
            width: 6rem;
          }
        }
      }
    }
  }
</style>