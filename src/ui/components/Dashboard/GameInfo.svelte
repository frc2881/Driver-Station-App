<script lang="ts">
  import { Alliance } from "../../../common";

  export let alliance: Alliance;
  export let stationNumber: number;
</script>

<div class="main">
  <div class="value { alliance?.toLowerCase() }">
    <h3>{ stationNumber ?? 0 }</h3>
  </div> 
</div>

<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;

    & .value {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
    }

    & .blue { background-color: #0000CC; }
    & .red { background-color: #CC0000; }
  }
</style>