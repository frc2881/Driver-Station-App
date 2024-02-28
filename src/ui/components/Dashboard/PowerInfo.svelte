<script lang="ts">
  import BatteryFull from "carbon-icons-svelte/lib/BatteryFull.svelte";
  import BatteryHalf from "carbon-icons-svelte/lib/BatteryHalf.svelte";
  import BatteryQuarter from "carbon-icons-svelte/lib/BatteryQuarter.svelte";
  import ObservedLightning from "carbon-icons-svelte/lib/ObservedLightning.svelte";
  import { Configuration } from "../../../config";

  const { BatteryVoltageLevel } = Configuration.Settings;

  export let batteryInfo: string;
  export let batteryVoltage: number;
  export let totalCurrent: number;
</script>

<div class="main">
  <div class="value info">{ batteryInfo ?? "2881|0001-A|2024-01" }</div>
  <div class="value totalCurrent">
    <h3>{ totalCurrent?.toFixed(2) ?? 0.00 }</h3>
    <ObservedLightning width=42 height=42 fill="#666666" style="margin-bottom:4px;"  />
  </div>
  <div class="value voltage">
    <h3>{ batteryVoltage?.toFixed(2) ?? 0.00 }</h3>
    { #if batteryVoltage >= BatteryVoltageLevel.Low }
      <BatteryFull width=64 height=64 fill="#00CC00" />
    { :else if batteryVoltage >= BatteryVoltageLevel.Warning }
      <BatteryHalf width=64 height=64 fill="#CCCC00" />
    { :else if batteryVoltage >= BatteryVoltageLevel.Critical }
      <BatteryHalf width=64 height=64 fill="#FF6600" />
    { :else }
      <BatteryQuarter width=64 height=64 fill="#CC0000" />
    { /if }
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .value {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: .5em;
      width: 11em;

      &.voltage {
        width: 11em;
      }

      &.totalCurrent {
        width: 10em;
      }

      &.info {
        margin: 3px 1.5em 0 0;
      }
    }
  }
</style>