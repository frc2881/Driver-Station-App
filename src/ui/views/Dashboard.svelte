<script lang="ts">
  import { Tile, InlineNotification } from "carbon-components-svelte";
  import { NetworkTables } from "../../common";
  import RobotInfo from "../components/RobotInfo.svelte";
  import Suction from "../components/Suction.svelte";

  export let networkTables: NetworkTables;
</script>

<main>
{ #if networkTables.isConnected }
  <div class="info">
    <div class="left">
      <RobotInfo 
        mode={ networkTables.topics.get("/SmartDashboard/Robot/Mode") }
        status={ networkTables.topics.get("/SmartDashboard/Robot/Status") }
      />
    </div>
    <div class="right"></div>
  </div>
  <div class="widgets">
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget"></Tile>
    <Tile class="widget">
      <Suction />
    </Tile>
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
    
    & .info {
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