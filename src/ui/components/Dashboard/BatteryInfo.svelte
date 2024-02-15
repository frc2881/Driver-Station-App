<script lang="ts">
  import BatteryFull from "carbon-icons-svelte/lib/BatteryFull.svelte";
  import BatteryHalf from "carbon-icons-svelte/lib/BatteryHalf.svelte";
  import BatteryQuarter from "carbon-icons-svelte/lib/BatteryQuarter.svelte";
  import { Configuration } from "../../../config";
  import { Utils } from "../../../common";

  const { BatteryVoltage } = Configuration.Settings;

  export let voltage: number;
</script>

<div class="main">
  <h3>{ voltage?.toFixed(2) ?? 0.00 }</h3>
  { #if voltage >= BatteryVoltage.Low }
    <BatteryFull width=64 height=64 fill="#00CC00" />
  { :else if voltage >= BatteryVoltage.Warning }
    <BatteryHalf width=64 height=64 fill="#CCCC00" />
  { :else if voltage >= BatteryVoltage.Critical }
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
    gap: .5em;
  }
</style>