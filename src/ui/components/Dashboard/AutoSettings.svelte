<script lang="ts">
  import { WarningAltFilled } from "carbon-icons-svelte";
  import SendableChooser from "../SendableChooser.svelte";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte";

  let activeCommand = $derived(nt.topics.get("/SmartDashboard/Robot/Auto/active")?.value ?? "None" as string);
  let commandName = $derived(nt.topics.get("/SmartDashboard/Robot/Auto/command")?.value ?? "None" as string);
  let isCompetitionMode = $derived(nt.topics.get("/SmartDashboard/Match/IsCompetitionMode")?.value ?? false as boolean);
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
  <div class="auto">
    {#if isCompetitionMode && activeCommand === "None" }
      <div class="warning"><WarningAltFilled width=120 height=120 fill="#CCCC00" /></div>
      <div class="info">No auto command selected for match!</div>
    {:else}
      {#if activeCommand != "None" }
      <img src={ `./assets/images/autos/${ commandName }.png` } alt="" />
      {/if}
    {/if}
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
      margin-top: 1.5em;
      background: var(--app-color-green);
      border: 1px solid var(--app-color-green);
      color: var(--app-color-black);
      text-align: center;
      font-weight: bold;
      font-size: 150%;
      padding: 0.75em 0;
      border-radius: 5px;

      &.none {
        background: none;
        border: 1px solid var(--app-color-charcoal);
        color: var(--app-color-charcoal);
        font-weight: normal;
      }
    }

    & .auto{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2em;
      height: 460px;
      overflow: hidden;
      
      & img {
        width: 800px;
        transform: rotate(-90deg) translateX(150px);
        filter: grayscale(100%);
      }

      & .warning {
        animation: pulse 750ms infinite ease;
      }

      & .info {
        margin: 1em 0;
        text-align: center;
        font-size: 125%;
        line-height: 150%;
      }
    }
  }
</style>