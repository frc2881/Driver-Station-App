<script lang="ts">
  import { Configuration } from "../../../config";
  import { 
    Utils,
    NetworkTablesTopic
	} from "../../../common";

  export let matchTime: NetworkTablesTopic;

  let time = 0;

  $: {
    time = matchTime?.value ?? 0;
    if (time === -1) { time = 0; }
  }
</script>

<div 
  class="main"
  class:inactive={ time === -1 }
  class:normal={ time > 0 }
  class:warning={ 
    Utils.isNumberInRange(
      time, 
      Configuration.Settings.MATCH_TIME_TRIGGERS.CRITICAL, 
      Configuration.Settings.MATCH_TIME_TRIGGERS.WARNING
    ) }
  class:critical={ 
    Utils.isNumberInRange(
      time, 1, Configuration.Settings.MATCH_TIME_TRIGGERS.CRITICAL
    ) }>
  <div class="time">{ time }</div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 280px;
    line-height: 280px;
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