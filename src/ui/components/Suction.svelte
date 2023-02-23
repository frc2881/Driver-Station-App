<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";
  import CloseFilled from "carbon-icons-svelte/lib/CloseFilled.svelte";
  import CircleDash from "carbon-icons-svelte/lib/CircleDash.svelte";
  import CircleFilled from "carbon-icons-svelte/lib/CircleFilled.svelte";
  import CenterCircle from "carbon-icons-svelte/lib/CenterCircle.svelte";
  import { 
    Utils,
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

  // TODO: make max reliable suction pressure a constant passed in from robot code
</script>

<div class="main">
  <h4 class="title">Suction</h4>
  <div class="content">
    <div class="status">
      <div>
        <svelte:component 
          this={ isEnabled?.value ? CheckmarkFilled : CloseFilled }
          fill={ isEnabled?.value ? "#00CC00" : "#CC0000" }
          width=120 height=120 />
      </div>
      <div class="pressures">
        <svelte:component 
          this={ 
            topPressureCurrent?.value <= topPressureTarget?.value ? CenterCircle : 
            (topPressureCurrent?.value <= topPressureMinimum?.value ? CircleFilled : CircleDash)  
          } 
          fill={
            topPressureCurrent?.value <= topPressureMinimum?.value ? "#00CC00" :
            (Utils.isNumberInRange(topPressureCurrent?.value, topPressureMinimum?.value, 40) ? "#CCCC00" : "#CC0000")
          }
          width=54 height=54 />
        <svelte:component 
          this={ 
            bottomPressureCurrent?.value <= bottomPressureTarget?.value ? CenterCircle : 
            (bottomPressureCurrent?.value <= bottomPressureMinimum?.value ? CircleFilled : CircleDash)  
          }  
          fill={
            bottomPressureCurrent?.value <= bottomPressureMinimum?.value ? "#00CC00" :
            (Utils.isNumberInRange(bottomPressureCurrent?.value, bottomPressureMinimum?.value, 40) ? "#CCCC00" : "#CC0000")
          }
          width=54 height=54 />
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
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 10px;

    .pressures {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>