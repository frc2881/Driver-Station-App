<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let climberArmPosition: number;

  let isReadyForEngage: boolean = false;
  let isReadyForClimb: boolean = false;

  // 26, 31, 38.7

  $: {
    isReadyForEngage = climberArmPosition > 26;
    isReadyForClimb = climberArmPosition > 38.5;
  }
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ isReadyForClimb }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
  </div>
  <div class="climber">
    <div class="leadscrew" class:active={ isReadyForEngage }></div>
    <div class="position">{ climberArmPosition?.toFixed(2) ?? 0 }</div>
  </div>
</div>

<style lang="postcss">
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .climber {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 2em;

      .leadscrew {
        display: flex;
        width: 10px;
        height: 160px;
        background: var(--app-color-charcoal);

        &.active {
          background: var(--app-color-green);
        }
      }

      .position {
        display: flex;
        font-size: 250%;
      }
    }

    .alignment {
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      animation: pulse 500ms infinite ease;

      &.active {
        display: flex;
      }
    }
  }

  @keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 0.1; }
  }
</style>