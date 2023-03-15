<script lang="ts">
  import ChevronLeft from "carbon-icons-svelte/lib/ChevronLeft.svelte";
  import ChevronRight from "carbon-icons-svelte/lib/ChevronRight.svelte";
  import ChevronUp from "carbon-icons-svelte/lib/ChevronUp.svelte";
  import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
  import { 
    NetworkTablesTopic
	} from "../../../common";

  export let armTiltPosition: NetworkTablesTopic;
  export let armExtendPosition: NetworkTablesTopic;

  let tilt: number;
  let extend: number;

  $: {
    tilt = armTiltPosition?.value;
    extend = armExtendPosition?.value;
  }
</script>

<div class="main">
  <div class="tilt">
    <ChevronUp width=48 height=48 fill="#FFFFFF" />
    <div class="value">{ tilt?.toFixed(2) ?? "----" }</div>
    <ChevronDown width=48 height=48 fill="#FFFFFF" />
  </div>
  <div class="extend">
    <ChevronLeft width=48 height=48 fill="#FFFFFF" />
    <div class="value">{ extend?.toFixed(2) ?? "----" }</div>
    <ChevronRight width=48 height=48 fill="#FFFFFF" />
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
    padding-right: 20px;

    .tilt {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .extend {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 15px;
    }

    .value {
      font-size: 48px;
      margin: 5px 10px;
    }
  }
</style>