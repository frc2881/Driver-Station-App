<script lang="ts">
  import { CheckmarkFilled } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let isTurretAlignedToTargetHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/IsAlignedToTargetHeading")?.value as boolean);
  let isLauncherAtTargetSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/IsAtTargetSpeed")?.value as boolean);
  let turretHeading = $derived(nt.topics.get("/SmartDashboard/Robot/Turret/Heading")?.value ?? 0 as number);
  let launcherSpeed = $derived(nt.topics.get("/SmartDashboard/Robot/Launcher/Speed")?.value ?? 0 as number);
</script>
<div class="main">
  <div 
    class="alignment"
    class:active={ isTurretAlignedToTargetHeading && isLauncherAtTargetSpeed }>
    <div class="checkmark"><CheckmarkFilled width=480 height=480 fill="#00CC00" /></div>
  </div>
  <div class="info">
    <div class="value">{ turretHeading.toFixed(1) } &deg;</div>
    <div class="value">{ (launcherSpeed * 100).toFixed(1) } %</div>
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
        font-size: 6rem;
        text-align: right;
      }
    }
  }
</style>