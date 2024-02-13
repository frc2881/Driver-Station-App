<script lang="ts">
  import BatteryFull from "carbon-icons-svelte/lib/BatteryFull.svelte";
  import BatteryHalf from "carbon-icons-svelte/lib/BatteryHalf.svelte";
  import BatteryQuarter from "carbon-icons-svelte/lib/BatteryQuarter.svelte";
  import { 
    Utils,
    NetworkTablesTopic
	} from "../../../common";

  export let voltage: NetworkTablesTopic;

  const formatVoltage = (voltage: number): string => {
    return voltage?.toFixed(2);
  }
</script>

<div class="main">
  <h3 class="value">{ formatVoltage(voltage?.value ?? 0) }</h3>
  { #if voltage?.value >= 12.3 }
    <BatteryFull width=64 height=64 fill="#00CC00" />
  { :else if Utils.isNumberInRange(voltage?.value, 12.1, 12.29) }
    <BatteryHalf width=64 height=64 fill="#CCCC00" />
  { :else if Utils.isNumberInRange(voltage?.value, 12, 12.09) }
    <BatteryHalf width=64 height=64 fill="#FF6600" />
  { :else }
    <BatteryQuarter width=64 height=64 fill="#CC0000" />
  { /if }
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5em;

    .value {
      margin-right: 0.25em;
    }
  }
</style>