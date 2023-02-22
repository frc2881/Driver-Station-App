<script lang="ts">
  import { Tile } from "carbon-components-svelte";
  import { 
		NetworkTables
	} from "../../common";

  export let networkTables: NetworkTables;
</script>

<main>
  <div class="status">
    <svg class="icon robot disabled" class:disabled={ !networkTables.isConnected }><use xlink:href="#iconRobot"/></svg>
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
</main>

<style lang="postcss">
  main {
    width: 100vw;
    height: 100vh;
    
    & .status {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 90px;
      padding: 0 30px;

      & .icon {
        width: 64px;
        height: 64px;
        
        &.robot {
          fill: var(--_color-pink);

          &.disabled {
            opacity: .2;
          }
        }
      }
    }

    & .widgets {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 340px;
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
</style>