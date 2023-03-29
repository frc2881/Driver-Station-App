<script lang="ts">
  import CenterSquare from "carbon-icons-svelte/lib/CenterSquare.svelte";
  import { 
    NetworkTablesTopic
  } from "../../../common";

  $: {}
</script>

<div class="main">
  <div class="camera">
    <CenterSquare
      fill={ true ? "#00CC00" : "#333333" }
      width=128
      height=128 />
  </div>
  <div class="camera">
    <CenterSquare
      fill={ true ? "#00CC00" : "#333333" }
      width=128
      height=128 />
  </div>
</div>

<style lang="postcss">
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>