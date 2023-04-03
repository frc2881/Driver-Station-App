<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder, Tile } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { 
    NetworkTables
	} from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import CameraStream from "../components/Hud/CameraStream.svelte";
  import MatchTime from "../components/Hud/MatchTime.svelte";
  import Suction from "../components/Hud/Suction.svelte";
  import DriveInfo from "../components/Hud/DriveInfo.svelte";
  import ArmPositions from "../components/Hud/ArmPositions.svelte";
  import GamePiece from "../components/Hud/GamePiece.svelte";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }
</script>

<main>
{ #if networkTables.isConnected }
  <div class="primary">
    <Tile class="widget">
      <DriveInfo 
        isRedAlliance={ networkTables.topics.get("/FMSInfo/IsRedAlliance") }
        nodes={ networkTables.topics.get("/SmartDashboard/Drive/Vision/Nodes") }
        robotPose={ networkTables.topics.get("/SmartDashboard/Drive/Pose") }
        isXConfiguration={ networkTables.topics.get("/SmartDashboard/Drive/Swerve/IsXConfiguration") } />
    </Tile>
    <Tile class="widget">
      <CameraStream 
        stream={ Configuration.Settings.CAMERA_STREAMS.DRIVER }
        isConnected={ networkTables.isConnected }
        width={ "800px" } height={ "600px" } />
    </Tile>
    <Tile class="widget">
      <Suction
        isEnabled={ networkTables.topics.get("/SmartDashboard/Suction/IsEnabled") }
        pressureMinimum={ networkTables.topics.get("/SmartDashboard/Suction/Pressure/Minimum") }
        pressureTarget={ networkTables.topics.get("/SmartDashboard/Suction/Pressure/Target") }
        pressureMaximum={ networkTables.topics.get("/SmartDashboard/Suction/Pressure/Maximum") }
        bottomPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Pressure/Current/Bottom") }
        topPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Pressure/Current/Top") }
        leftPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Pressure/Current/Left") }
        rightPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Pressure/Current/Right") } />
    </Tile>
  </div>
  <div class="secondary">
    <Tile class="widget">
      <GamePiece
        lightsPattern={ networkTables.topics.get("/SmartDashboard/Lights/Pattern") } />
    </Tile>
    <Tile class="widget">
      <MatchTime 
        matchTime={ networkTables.topics.get("/SmartDashboard/Timing/MatchTime") } />
    </Tile>
    <Tile class="widget">
      <ArmPositions 
        armTiltPosition={ networkTables.topics.get("/SmartDashboard/Arm/Tilt/Position") }
        armExtendPosition={ networkTables.topics.get("/SmartDashboard/Arm/Extend/Position") } />
    </Tile>
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
    grid-template-rows: 620px auto;
    row-gap: 0px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding: 10px;

    .primary {
      display: grid;
      grid-template-columns: 540px 820px 540px;
    }

    .secondary {
      display: grid;
      grid-template-columns: 540px 820px 540px;
    }

    :global .widget {
      margin: 10px;
      padding: 0px;
      background: #1C1C1C;
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