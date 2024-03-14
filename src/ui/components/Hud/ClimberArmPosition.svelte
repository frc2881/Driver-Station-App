<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let climberArmPosition: number;
  export let climberArmIsReadyForChainEngagement: boolean;
  export let climberArmIsReadyForStageClimb: boolean;
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ climberArmIsReadyForStageClimb }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
  </div>
  <div class="climber">
    <div class="arm">
      <div class="track" style:height={ `${ 39 * 6 }px` }></div>
      <div class="leadscrew" class:active={ climberArmIsReadyForChainEngagement } style:height={ `${climberArmPosition * 6}px` }></div>
    </div>
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
      height: 260px;
      gap: 3em;

      .arm {
        position: relative;
        display: flex;
        align-items: flex-end;
        height: 100%;

        .track {
          position: absolute;
          width: 10px;
          background: var(--app-color-charcoal);
        }
        .leadscrew {
          position: absolute;
          width: 10px;
          background: var(--app-color-pink);
          &.active {
            background: var(--app-color-green);
          }
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