<script lang="ts">
  import SendableChooser from "../SendableChooser.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte";

  let activeCommand = $derived(nt.topics.get("/SmartDashboard/Robot/Auto/active")?.value ?? "None");
</script>

<div class="main">
  <div class="title"><h4>Auto</h4></div>
  <div>
    <SendableChooser
      name=""
      key="/SmartDashboard/Robot/Auto"
      useInline={ false } />
  </div>
  <div 
    class="active"
    class:none={ activeCommand === "None" }>
    { activeCommand }
  </div>
  <div class="autos">
    <img src="./assets/images/autos.png" alt="Autos" />
  </div>
</div>

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }

    & .active {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-top: 1em;
      background: var(--app-color-pink);
      border: 1px solid var(--app-color-pink);
      color: var(--app-color-black);
      text-align: center;
      font-weight: bold;
      font-size: 150%;
      padding: 0.5em 0;

      &.none {
        background: none;
        border: 1px solid var(--app-color-charcoal);
        color: var(--app-color-charcoal);
        font-weight: normal;
      }
    }

    & .autos{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2.75em;
      
      & img {
        width: 435px;
      }
    }
  }
</style>