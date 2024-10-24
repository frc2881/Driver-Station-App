<script lang="ts">
  import { run } from 'svelte/legacy';

  import { Configuration, Utils } from "../../../common/index.js";

  const { MatchTime } = Configuration.Settings;
  interface Props {
    matchTime: number;
  }

  let { matchTime }: Props = $props();

  let _matchTime = $state(0);

  run(() => { 
    _matchTime = Utils.isNumberInRange(matchTime, 0, 135) ? matchTime : 0;
  });
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
    color: var(--app-color-charcoal);
    z-index: 9999;

    &.inactive {
      color: var(--app-color-charcoal) !important;
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