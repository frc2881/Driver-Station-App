<script lang="ts">
	import { type Pose2d, Utils } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let robotPose = $derived(nt.topics.get("/Telemetry/Robot/Services/Localization/Pose")?.value as any);
  let launcherSpeed = $derived(nt.topics.get("/Telemetry/Robot/Subsystems/Launcher/Leader/Speed")?.value ?? 0 as number);

  let targetStableRightDistance = $derived(nt.topics.get("/Telemetry/Robot/Services/Targeting/Targets/STABLE_RIGHT/Distance")?.value ?? 0 as number);
  let targetStableRightHeading = $derived(nt.topics.get("/Telemetry/Robot/Services/Targeting/Targets/STABLE_RIGHT/Heading")?.value ?? 0 as number);
  let targetStableRightSpeed = $derived(nt.topics.get("/Telemetry/Robot/Services/Targeting/Targets/STABLE_RIGHT/Speed")?.value ?? 0 as number);
  let targetStableLeftDistance = $derived(nt.topics.get("/Telemetry/Robot/Services/Targeting/Targets/STABLE_LEFT/Distance")?.value ?? 0 as number);
  let targetStableLeftHeading = $derived(nt.topics.get("/Telemetry/Robot/Services/Targeting/Targets/STABLE_LEFT/Heading")?.value ?? 0 as number);
  let targetStableLeftSpeed = $derived(nt.topics.get("/Telemetry/Robot/Services/Targeting/Targets/STABLE_LEFT/Speed")?.value ?? 0 as number);

  let robotPose_: Pose2d = $derived(Utils.decodePose2dFromStruct(robotPose));
</script>
<div class="main">
  <div class="info">
    <div class="value">{ robotPose_.rotation.toFixed(1) } &deg;</div>
    <div class="value">{ (launcherSpeed * 100).toFixed(1) } %</div>
  </div>
  <div class="targeting">
    <div class="row header">
      <div class="target">Target</div>
      <div>Distance</div>
      <div>Heading</div>
      <div>Speed</div>
    </div>
    <div class="row">
      <div class="target">{ "STABLE_RIGHT".replace("_", " ") || "?" }</div>
      <div>{ targetStableRightDistance.toFixed(2) } m</div>
      <div>{ targetStableRightHeading.toFixed(1) } &deg;</div>
      <div>{ (targetStableRightSpeed * 100).toFixed(1) } %</div>
    </div>
    <div class="row">
      <div class="target">{ "STABLE_LEFT".replace("_", " ") || "?" }</div>
      <div>{ targetStableLeftDistance.toFixed(2) } m</div>
      <div>{ targetStableLeftHeading.toFixed(1) } &deg;</div>
      <div>{ (targetStableLeftSpeed * 100).toFixed(1) } %</div>
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
        }
      }
    }
  }
</style>