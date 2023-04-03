<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import CircleDash from "carbon-icons-svelte/lib/CircleDash.svelte";
  import CircleFilled from "carbon-icons-svelte/lib/CircleFilled.svelte";
  import ConditionWaitPoint from "carbon-icons-svelte/lib/ConditionWaitPoint.svelte";
  import CircleSolid from "carbon-icons-svelte/lib/CircleSolid.svelte";
  import { 
    Utils,
    NetworkTablesTopic
	} from "../../../common";

  export let isEnabled: NetworkTablesTopic;

  export let pressureMinimum: NetworkTablesTopic;
  export let pressureTarget: NetworkTablesTopic;
  export let pressureMaximum: NetworkTablesTopic;

  export let bottomPressureCurrent: NetworkTablesTopic;
  export let topPressureCurrent: NetworkTablesTopic;
  export let leftPressureCurrent: NetworkTablesTopic;
  export let rightPressureCurrent: NetworkTablesTopic;

  const pressureAmbient = 50;

  const formatValue = (value: number): string => {
    return (value as number).toFixed(1);
  }
</script>

<div class="main">
  <div class="status">
    <div class="pressures">
      <div>
        <div class="gauge">
          <div class="state">
            <svelte:component 
              this={ 
                topPressureCurrent?.value <= pressureMaximum?.value ? CircleSolid : 
                (topPressureCurrent?.value <= pressureTarget?.value ? CircleFilled : 
                (topPressureCurrent?.value <= pressureMinimum?.value ? ConditionWaitPoint : CircleDash))  
              } 
              fill={
                topPressureCurrent?.value <= pressureMinimum?.value ? "#00CC00" :
                (Utils.isNumberInRange(topPressureCurrent?.value, pressureMinimum?.value, pressureAmbient) ? "#CC6633" : "#CC0000")
              }
              width=120 height=120 />
          </div>
          <div class="value" class:enabled={ topPressureCurrent?.value <= pressureMinimum?.value }>{ formatValue(topPressureCurrent?.value ?? 0) }</div>
        </div>
      </div>
      <div>
        <div class="gauge">
          <div class="state">
            <svelte:component 
              this={ 
                leftPressureCurrent?.value <= pressureMaximum?.value ? CircleSolid : 
                (leftPressureCurrent?.value <= pressureTarget?.value ? CircleFilled : 
                (leftPressureCurrent?.value <= pressureMinimum?.value ? ConditionWaitPoint : CircleDash))  
              } 
              fill={
                leftPressureCurrent?.value <= pressureMinimum?.value ? "#00CC00" :
                (Utils.isNumberInRange(leftPressureCurrent?.value, pressureMinimum?.value, pressureAmbient) ? "#CC6633" : "#CC0000")
              }
              width=120 height=120 />
          </div>
          <div class="value" class:enabled={ leftPressureCurrent?.value <= pressureMinimum?.value }>{ formatValue(leftPressureCurrent?.value ?? 0) }</div>
        </div>
        <div class="spacer"></div>
        <div class="gauge">
          <div class="state">
            <svelte:component 
              this={ 
                rightPressureCurrent?.value <= pressureMaximum?.value ? CircleSolid : 
                (rightPressureCurrent?.value <= pressureTarget?.value ? CircleFilled : 
                (rightPressureCurrent?.value <= pressureMinimum?.value ? ConditionWaitPoint : CircleDash))  
              } 
              fill={
                rightPressureCurrent?.value <= pressureMinimum?.value ? "#00CC00" :
                (Utils.isNumberInRange(rightPressureCurrent?.value, pressureMinimum?.value, pressureAmbient) ? "#CC6633" : "#CC0000")
              }
              width=120 height=120 />
          </div>
          <div class="value" class:enabled={ rightPressureCurrent?.value <= pressureMinimum?.value }>{ formatValue(rightPressureCurrent?.value ?? 0) }</div>
        </div>
      </div>
      <div>
        <div class="gauge">
          <div class="state">
            <svelte:component 
              this={ 
                bottomPressureCurrent?.value <= pressureMaximum?.value ? CircleSolid : 
                (bottomPressureCurrent?.value <= pressureTarget?.value ? CircleFilled : 
                (bottomPressureCurrent?.value <= pressureMinimum?.value ? ConditionWaitPoint : CircleDash))  
              } 
              fill={
                bottomPressureCurrent?.value <= pressureMinimum?.value ? "#00CC00" :
                (Utils.isNumberInRange(bottomPressureCurrent?.value, pressureMinimum?.value, pressureAmbient) ? "#CC6633" : "#CC0000")
              }
              width=120 height=120 />
          </div>
          <div class="value" class:enabled={ bottomPressureCurrent?.value <= pressureMinimum?.value }>{ formatValue(bottomPressureCurrent?.value ?? 0) }</div>
        </div>
      </div>
    </div>
    <div>
      <svelte:component 
        this={ isEnabled?.value ? CheckmarkFilled : CloseFilled }
        fill={ isEnabled?.value ? "#CCCCCC" : "#CC0000" }
        width=120 height=120 />
    </div>
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .status {
      width: 100%;
      display: grid;
      grid-template-rows: auto auto;
      justify-items: center;
      row-gap: 40px;

      .pressures {
        display: grid;
        grid-template-rows: auto auto auto;
        justify-items: center;

        .gauge {
          display: inline-grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr;
          align-items: center;
          justify-items: center;

          .state, .value {
            grid-area: 1 / 1 / 2 / 2;
          }

          .value {
            padding: 0 0px 4px 0;
            font-size: 18px;

            &.enabled {
              color: #000000;
            }
          }
        }

        .spacer {
          display: inline-block;
          width: 100px;
        }
      }
    }
  }
</style>