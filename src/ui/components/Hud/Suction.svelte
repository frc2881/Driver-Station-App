<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import CircleDash from "carbon-icons-svelte/lib/CircleDash.svelte";
  import CircleFilled from "carbon-icons-svelte/lib/CircleFilled.svelte";
  import CenterCircle from "carbon-icons-svelte/lib/CenterCircle.svelte";
  import { 
    Utils,
    NetworkTablesTopic
	} from "../../../common";

  export let isEnabled: NetworkTablesTopic;

  export let topPressureCurrent: NetworkTablesTopic;
  export let topPressureMinimum: NetworkTablesTopic;
  export let topPressureTarget: NetworkTablesTopic;

  export let bottomPressureCurrent: NetworkTablesTopic;
  export let bottomPressureMinimum: NetworkTablesTopic;
  export let bottomPressureTarget: NetworkTablesTopic;

  const pressureVacuumMin = 40;   // TODO: make max reliable suction pressure a constant passed in from robot code
</script>

<div class="main">
  <div class="status">
    <div class="pressures">
      <svelte:component 
        this={ 
          topPressureCurrent?.value <= topPressureTarget?.value ? CenterCircle : 
          (topPressureCurrent?.value <= topPressureMinimum?.value ? CircleFilled : CircleDash)  
        } 
        fill={
          topPressureCurrent?.value <= topPressureMinimum?.value ? "#00CC00" :
          (Utils.isNumberInRange(topPressureCurrent?.value, topPressureMinimum?.value, pressureVacuumMin) ? "#CCCC00" : "#CC0000")
        }
        width=180 height=180 />
      <svelte:component 
        this={ 
          bottomPressureCurrent?.value <= bottomPressureTarget?.value ? CenterCircle : 
          (bottomPressureCurrent?.value <= bottomPressureMinimum?.value ? CircleFilled : CircleDash)  
        }  
        fill={
          bottomPressureCurrent?.value <= bottomPressureMinimum?.value ? "#00CC00" :
          (Utils.isNumberInRange(bottomPressureCurrent?.value, bottomPressureMinimum?.value, pressureVacuumMin) ? "#CCCC00" : "#CC0000")
        }
        width=180 height=180 />
    </div>
    <div>
      <svelte:component 
        this={ isEnabled?.value ? CheckmarkFilled : CloseFilled }
        fill={ isEnabled?.value ? "#00CC00" : "#CC0000" }
        width=200 height=200 />
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
      display: grid;
      grid-template-rows: auto auto;
      row-gap: 10px;

      .pressures {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>