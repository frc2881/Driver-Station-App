<script lang="ts">
  import { BatteryFull, BatteryHalf, BatteryWarning, BatteryError, BatteryEmpty } from "carbon-icons-svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  const BatteryVoltageLevel = {
    Low: 12.2,
    Warning: 11.99,
    Critical: 11.8
  };

  let batteryInfo = $derived(nt.topics.get("/SmartDashboard/Robot/Power/Battery/Info")?.value as string);
  let batteryVoltage = $derived(nt.topics.get("/SmartDashboard/Robot/Power/Battery/Voltage")?.value as number);
  let isBrownedOut = $derived(nt.topics.get("/SmartDashboard/Robot/Power/IsBrownedOut")?.value as boolean);

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
        <div class="value">{ batteryVoltage?.toFixed(2) ?? "0.00" }</div>
        <div class="info">{ batteryInfo ?? "UNKNOWN" }</div>
      </div>
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
    }
  }
</style>