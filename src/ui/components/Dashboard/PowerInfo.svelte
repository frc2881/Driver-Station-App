<script lang="ts">
  import { BatteryFull, BatteryHalf, BatteryWarning, BatteryError, BatteryEmpty, VolumeFileStorage } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  const BatteryVoltageLevel = {
    Low: 12.2,
    Warning: 11.99,
    Critical: 11.8
  };

  let batteryInfo = $derived(nt.topics.get("/SmartDashboard/Robot/Power/Battery/Info")?.value as string);
  let batteryVoltage = $derived(nt.topics.get("/SmartDashboard/Robot/Power/Battery/Voltage")?.value as number);
  let isBrownedOut = $derived(nt.topics.get("/SmartDashboard/Robot/Power/IsBrownedOut")?.value as boolean);

  let _batteryVoltages: number[] = new Array(30).fill(0);
  let batteryVoltages: number[] = $derived.by(() => {
    if (_batteryVoltages.push(batteryVoltage ?? 0) > 30) {
      _batteryVoltages.shift();
    }
    return [..._batteryVoltages];
  });

  const iconSize = 180;
</script>

<div class="main">
  <div class="title"><h4>Power</h4></div>
  <div class="battery">
    <div class="status">
      <div>
        {#if isBrownedOut}
          <div class="warning"><BatteryError width={ iconSize } height={ iconSize } fill="#663300" /></div>
        {:else if batteryVoltage <= BatteryVoltageLevel.Critical}
          <div class="warning"><BatteryWarning width={ iconSize } height={ iconSize } fill="#CC0000" /></div>
        {:else if batteryVoltage <= BatteryVoltageLevel.Warning}
          <div><BatteryWarning width={ iconSize } height={ iconSize } fill="#FF6600" /></div>
        {:else if batteryVoltage <= BatteryVoltageLevel.Low}
          <div><BatteryHalf width={ iconSize } height={ iconSize } fill="#CCCC00" /></div>
        {:else if batteryVoltage > BatteryVoltageLevel.Low}
          <div><BatteryFull width={ iconSize } height={ iconSize } fill="#00CC00" /></div>
        {:else}
          <div><BatteryEmpty width={ iconSize } height={ iconSize } fill="#666666" /></div>
        {/if}
      </div>
      <div>
        <div class="value">{ batteryVoltage?.toFixed(2) ?? "-----" }</div>
        <div class="info">{ batteryInfo ?? "UNKNOWN" }</div>
      </div>
    </div>
    <div class="sparkline">
      {#each batteryVoltages as voltage}
        <span 
          style:height={`${ voltage > 0 ? (voltage / 13.0) * 100 : 33 }%`}
          class={{ 
            "normal": voltage > BatteryVoltageLevel.Low,
            "low": voltage <= BatteryVoltageLevel.Low,
            "warning": voltage <= BatteryVoltageLevel.Warning,
            "critical": voltage <= BatteryVoltageLevel.Critical,
            "error": voltage == 0,
            "brownout": isBrownedOut
          }}
        ></span>
      {/each}
    </div>
  </div>
</div>

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }

    & .battery {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & .status {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2em;

        & .warning {
          animation: pulse 750ms infinite ease;
        }

        & .value {
          font-size: 300%;
        }

        & .info {
          margin: 1em 0 0 0.5em;
        }
      }

      & .sparkline {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 8px;
        width: 300px;
        height: 60px;
        opacity: 0.75;

        & span {
          display: block;
          width: 2px;
          border-radius: 2px;

          &.normal { background: var(--app-color-green); }
          &.low { background: var(--app-color-yellow); }
          &.warning { background: var(--app-color-orange); }
          &.critical { background: var(--app-color-red); }
          &.brownout { background: var(--app-color-brown); }
          &.error { background: var(--app-color-charcoal); }
        }
      }
    }
  }
</style>