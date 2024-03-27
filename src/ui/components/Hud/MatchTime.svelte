<script lang="ts">
  import { Configuration } from "../../../config";
  import { Utils } from "../../../common";

  const { MatchTime } = Configuration.Settings;
  export let matchTime: number;

  $: { 
    matchTime = matchTime === -1 ? 0 : matchTime ?? 0; 
  }
</script>

<div 
  class="main"
  class:inactive={ matchTime === 0 }
  class:normal={ matchTime > 0 }
  class:warning={ 
    Utils.isNumberInRange(
      matchTime, 
      MatchTime.Critical, 
      MatchTime.Warning
    ) }
  class:critical={ 
    Utils.isNumberInRange(
      matchTime, 1, MatchTime.Critical
    ) }>
  <div class="time">{ matchTime }</div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 160px;
    line-height: 160px;
    font-weight: bold;
    color: var(--app-color-charcoal);

    &.inactive {
      color: var(--app-color-charcoal) !important;
    }

    &.normal {
      color: var(--app-color-white);
    }

    &.warning {
      color: var(--app-color-yellow);
      animation: pulse 1000ms ease-in-out infinite;
    }

    &.critical {
      color: var(--app-color-red);
      animation: pulse 750ms ease-in-out infinite;
    }

    .time {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }

  @keyframes pulse {
		0%    { opacity: 0.75; transform: scale(1);  }
		50%   { opacity: 1; transform: scale(1.025); }
		100%  { opacity: 0.75; transform: scale(1); }
	}
</style>