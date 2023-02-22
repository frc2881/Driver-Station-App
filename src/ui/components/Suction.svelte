<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import { 
    NetworkTablesTopic
	} from "../../common";

  export let isEnabled: NetworkTablesTopic;

  export let topPressureCurrent: NetworkTablesTopic;
  export let topPressureMinimum: NetworkTablesTopic;
  export let topPressureTarget: NetworkTablesTopic;
  export let topMotorSpeed: NetworkTablesTopic;

  export let bottomPressureCurrent: NetworkTablesTopic;
  export let bottomPressureMinimum: NetworkTablesTopic;
  export let bottomPressureTarget: NetworkTablesTopic;
  export let bottomMotorSpeed: NetworkTablesTopic;
</script>

<div class="main">
  <h4 class="title">Suction</h4>
  <div class="content">
    <div class="status">
      <svelte:component 
        this={ isEnabled?.value ? CheckmarkFilled : CloseFilled } 
        width=96 
        height=96 
        fill={ isEnabled?.value ? "#00CC00" : "#CC0000" } />
    </div>
    <div class="gauges">
      <div class="gauge">
        <div class="motor" class:enabled={ topMotorSpeed?.value > 0 }>{ Math.floor((topMotorSpeed?.value ?? 0) * 100) }%</div>
        <div class="pressure"><div class="bar"></div></div>
        <div class="value" class:active={ topPressureCurrent?.value <= topPressureMinimum?.value }>{ topPressureCurrent?.value ?? 0 }</div>
      </div>
      <div class="gauge">
        <div class="motor" class:enabled={ bottomMotorSpeed?.value > 0 }>{ Math.floor((bottomMotorSpeed?.value ?? 0) * 100) }%</div>
        <div class="pressure"><div class="bar"></div></div>
        <div class="value" class:active={ bottomPressureCurrent?.value <= bottomPressureMinimum?.value }>{ bottomPressureCurrent?.value ?? 0 }</div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .status {
    margin-bottom: 20px;
  }

  .gauges {
    display: grid;
    grid-template-rows: auto auto;
    row-gap: 10px;

      .gauge {
        display: grid;
        grid-template-columns: auto auto auto;
        column-gap: 10px;
      
      .motor {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background-color: var(--app-color-charcoal);
        font-size: 18px;
        color: #000000;

        &.enabled {
          background-color: var(--app-color-green);
        }
      }

      .pressure {
        display: flex;
        align-items: center;
        width: 250px;
        height: 50px;
        background: linear-gradient(
          to right, 
          #006600 0 45%,
          #666600 45% 60%,
          #333333 60% 100%
        );

        .bar {
          width: 100%;
          height: 33%;
          background-color: #FFFFFF66;
        }
      }

      .value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border: 1px solid var(--app-color-charcoal);
        font-size: 20px;
        color: var(--app-color-smoke);

        &.active {
          border: none;
          background-color: var(--app-color-green);
          color: #000000; 
        }
      }
    }
  }


</style>