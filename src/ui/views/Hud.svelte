<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder, Tile } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { 
    NetworkTables
	} from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import CameraStream from "../components/Hud/CameraStream.svelte";
  import MatchTime from "../components/Hud/MatchTime.svelte";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }
</script>

<main>
{ #if networkTables.isConnected }
  <div class="primary">
    <Tile class="widget">
    </Tile>
    <Tile class="widget">
      <CameraStream 
        stream={ Configuration.Settings.Cameras.Front }
        isConnected={ networkTables.isConnected }
        width={ "800px" } height={ "450px" } />
    </Tile>
    <Tile class="widget">
    </Tile>
  </div>
  <div class="secondary">
    <Tile class="widget">
    </Tile>
    <Tile class="widget">
      <MatchTime 
        matchTime={ networkTables.topics.get("/SmartDashboard/Robot/Game/MatchTime") } />
    </Tile>
    <Tile class="widget">
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