<script lang="ts">
  import { Tile, InlineNotification } from "carbon-components-svelte";
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import WarningAltFilled from "carbon-icons-svelte/lib/WarningAltFilled.svelte";
  import { 
		NetworkTables,
    RobotMode,
    RobotStatus
	} from "../../common";

  export let networkTables: NetworkTables;

  let robotMode: RobotMode;
  let robotStatus: RobotStatus;

  $: {
    robotMode = networkTables.topics.get("/SmartDashboard/Robot/Mode")?.value;
    robotStatus = networkTables.topics.get("/SmartDashboard/Robot/Status")?.value;
  }
</script>

<main>
{ #if networkTables.isConnected }
  <div class="infobar">
    <div class="left">
      <div class="mode"><h3>{ robotStatus === RobotStatus.Estopped ? "ESTOP" : robotMode }</h3></div>
      <div class="status">
        { #if robotStatus === RobotStatus.Enabled }
          <CheckmarkFilled width=48 height=48 fill="#00CC00" />
        { /if }
        { #if robotStatus === RobotStatus.Disabled }
          <CloseFilled width=48 height=48 fill="#CC0000" />
        { /if }
        { #if robotStatus === RobotStatus.Estopped }
          <WarningAltFilled width=48 height=48 fill="#CCCC00" />
        { /if } 
      </div>
    </div>
    <div class="right"></div>
  </div>
  <div class="widgets">
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
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
  <div class="watermark"><svg class="icon"><use xlink:href="#iconRobot"/></svg></div>
{ /if }
</main>

<style lang="postcss">
  main {
    width: 100vw;
    height: 100vh;
    
    & .infobar {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 100px;
      padding: 0 20px;

      & .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      & .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      & .mode {
        width: 160px;
        text-align: center;
        padding: 5px 0;
        border: 1px solid var(--_color-charcoal);
      }

      & .status {
        margin: 5px 0 0 20px;
      }
    }

    & .widgets {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 350px;
      column-gap: 20px;
      row-gap: 20px;
      padding: 0 20px 20px 20px;

      :global {
        .widget {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .inlineNotification {
    padding: .75em 2em;
  }

  .watermark {
    position: absolute;
    left: 50%;
    top: 50%;

    & .icon {
      width: 48px;
      height: 48px;
      transform: scale(6);
      fill: var(--_color-pink);
      opacity: 0.2;
    }
  }
</style>