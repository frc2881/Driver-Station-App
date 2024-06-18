<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let frontNoteObjectSensorHasTarget: boolean;
  export let frontNoteObjectSensorTargetYaw: number;
  export let frontNoteObjectSensorTargetArea: number;

  let isAlignedToTarget: boolean = false;
  $:{ 
    isAlignedToTarget = frontNoteObjectSensorHasTarget && Math.abs(frontNoteObjectSensorTargetYaw) <= 3.0;
  }
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ isAlignedToTarget }>
    <CheckmarkFilled width=380 height=380 fill="#00CC00" />
  </div>
  <div class="robot"></div>
  <div 
    class="note"
    class:active={ frontNoteObjectSensorHasTarget }
    style:transform={ `translate(${ frontNoteObjectSensorTargetYaw * 9 }px, ${ frontNoteObjectSensorTargetArea * 18 }px)` }></div>
</div>

<style>
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    & .robot {
      position: absolute;
      bottom: -10px;
      width: 330px;
      height: 80px;
      border: 15px solid var(--app-color-pink);
      border-radius: 10px;
      border-bottom: none;
    }

    & .note {
      display: none;
      position: absolute;
      top: 20px;
      width: 160px;
      height: 160px;
      border-radius: 80px;
      border: 20px solid var(--app-color-orange);

      &.active {
        display: block;
      }
    }

    & .alignment {
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      animation: pulse 500ms infinite ease;
      z-index: 9999;

      &.active {
        display: flex;
      }
    }
  }
</style>