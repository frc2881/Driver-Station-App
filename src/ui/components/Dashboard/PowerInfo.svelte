<script lang="ts">
  import { BatteryFull, BatteryHalf, BatteryWarning, BatteryEmpty, Vpn } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";
  
  const BatteryVoltageLevel = {
    Low: 12.2,
    Warning: 11.99,
    Critical: 11.8
  };

  let batteryInfo = $derived(nt.topics.get("/SmartDashboard/Robot/Power/Battery/Info")?.value as string);
  let batteryVoltage = $derived(nt.topics.get("/SmartDashboard/Robot/Power/Battery/Voltage")?.value as number);

  const _batteryVoltages: number[] = [];
  let batteryVoltages = $derived.by(() => {
    _batteryVoltages.push(batteryVoltage);
    if (_batteryVoltages.length > 50) { _batteryVoltages.shift(); }
    return [..._batteryVoltages];
  });

  const iconSize = 180;
</script>

<div class="main">
  <div class="title"><h4>Power</h4></div>
  <div class="battery">
    <div class="status">
      <div>
        {#if batteryVoltage <= BatteryVoltageLevel.Critical}
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
        <div class="value">{ batteryVoltage?.toFixed(2) ?? "0.00" } V</div>
        <div class="info">{ batteryInfo ?? "UNKNOWN" }</div>
      </div>
    </div>
    <div class="graph">
      {#each batteryVoltages as voltage}
        <span style:height={ `${ ((voltage - 6) * 10)  }px` }></span>
      {/each}
      <div class="line"></div>
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
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & .status {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1em;

        & .warning {
          animation: pulse 750ms infinite ease;
        }

        & .value {
          width: 150px;
          font-size: 300%;
          text-align: right;
        }

        & .info {
          margin: 1em 0 0 0.5em;
          text-align: right;
        }
      }

      & .graph {
        position: absolute;
        bottom: -60px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 2px;
        width: 350px;
        height: 60px;

        & span {
          display: block;
          width: 5px;
          background-color: var(--app-color-charcoal);
        }

        & .line {
          position: absolute;
          top: 45px;
          width: 100%;
          height: 1px;
          background-color: var(--app-color-yellow);
          opacity: 0.75;
        }
      }
    }
  }
</style>