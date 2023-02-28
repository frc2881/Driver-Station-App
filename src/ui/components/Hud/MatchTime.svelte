<script lang="ts">
  import { 
    Configuration,
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
  { time }
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 200px;
    line-height: 200px;
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
      animation: pulse-animation 1000ms ease-in-out infinite;
    }

    &.critical {
      color: var(--app-color-red);
      animation: pulse-animation 750ms ease-in-out infinite;
    }
  }
</style>