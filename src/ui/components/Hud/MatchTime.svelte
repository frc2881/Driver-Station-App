<script lang="ts">
  import { Configuration, Utils } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  const { MatchTime } = Configuration.Settings;
  let matchTime = $derived(nt.topics.get("/SmartDashboard/Game/MatchTime")?.value as number);
  let _matchTime = $derived(Utils.isNumberInRange(matchTime, 0, 135) ? matchTime : 0);
</script>

<div 
  class="main"
  class:inactive={ _matchTime === 0 }
  class:normal={ _matchTime > 0 }
  class:warning={ 
    Utils.isNumberInRange(
      _matchTime, 
      MatchTime.Critical, 
      MatchTime.Warning
    ) }
  class:critical={ 
    Utils.isNumberInRange(
      _matchTime, 1, MatchTime.Critical
    ) }>
  <div class="time">{ _matchTime }</div>
</div>

<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 200px;
    line-height: 200px;
    font-weight: bold;
    color: var(--app-color-smoke);
    z-index: 9999;

    &.inactive {
      color: var(--app-color-smoke) !important;
    }

    &.normal {
      color: var(--app-color-white);
    }

    &.warning {
      color: var(--app-color-yellow);
      animation: pulse-expand 1000ms ease-in-out infinite;
    }

    &.critical {
      color: var(--app-color-red);
      animation: pulse-expand 750ms ease-in-out infinite;
    }

    & .time {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
</style>