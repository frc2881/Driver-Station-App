<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { 
    NetworkTables
	} from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import CameraStream from "../components/Hud/CameraStream.svelte";
  import MatchTime from "../components/Hud/MatchTime.svelte";
  import Suction from "../components/Hud/Suction.svelte";
  import TargetAlignment from "../components/Hud/TargetAlignment.svelte";
  import ArmPositions from "../components/Hud/ArmPositions.svelte";
  import GamePiece from "../components/Hud/GamePiece.svelte";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }
</script>

<main>
{ #if networkTables.isConnected }
  <div class="primary">
    <TargetAlignment 
      robotPose={ networkTables.topics.get("/SmartDashboard/Drive/Pose") }
      isRedAlliance={ networkTables.topics.get("/FMSInfo/IsRedAlliance") }/>
    <CameraStream 
      stream={ Configuration.Settings.CAMERA_STREAMS.DRIVER }
      isConnected={ networkTables.isConnected }
      width={ "800px" } height={ "600px" }  />
    <Suction
      isEnabled={ networkTables.topics.get("/SmartDashboard/Suction/IsEnabled") }
      topPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Current") }
      topPressureMinimum={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Minimum") }
      topPressureTarget={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Target") }
      bottomPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Current") }
      bottomPressureMinimum={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Minimum") }
      bottomPressureTarget={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Target") } />
  </div>
  <div class="secondary">
    <GamePiece
      lightsPattern={ networkTables.topics.get("/SmartDashboard/Lights/Pattern") } />
    <MatchTime 
      matchTime={ networkTables.topics.get("/SmartDashboard/Timing/MatchTime") } />
    <ArmPositions 
      armTiltPosition={ networkTables.topics.get("/SmartDashboard/Arm/Tilt/Position") }
      armExtendPosition={ networkTables.topics.get("/SmartDashboard/Arm/Extend/Position") } />
  </div>
{ :else }
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ networkTables.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton />
  </div>
  <div class="watermark"><SkeletonPlaceholder class="skeleton" /><svg class="icon"><use xlink:href="#iconRobot"/></svg></div>
{ /if }
</main>

<style lang="postcss">
  main {
    display: grid;
    grid-template-rows: 600px auto;
    row-gap: 80px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .primary {
      display: grid;
      grid-template-columns: 560px 800px 560px;
      margin-top: 80px;
    }

    .secondary {
      display: grid;
      grid-template-columns: 560px 800px 560px;
    }
  }

  .inlineNotification {
    padding: .75em 2em;
  }

  .watermark {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-128px, -128px);

    :global {
      .skeleton {
        position: absolute;
        width: 256px;
        height: 256px;
      }
    }

    .icon {
      position: absolute;
      width: 256px;
      height: 256px;
      fill: var(--app-color-pink);
    }
  }
</style>