<script lang="ts">
  import { 
    NetworkTablesTopic
	} from "../../../common";

  export let isRedAlliance: NetworkTablesTopic;
  export let stationNumber: NetworkTablesTopic;
</script>

<div class="main">
  <div class="value" style:background={ isRedAlliance?.value ? "#CC0000" : "#0000CC" }>
    <h3>{ stationNumber?.value ?? "" }</h3>
  </div> 
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;

    .value {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
    }
  }
</style>