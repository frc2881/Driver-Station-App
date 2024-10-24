<script lang="ts">
  import { Configuration, type Alliance } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte";
  import SendableChooser from "../SendableChooser.svelte";

  interface Props {
    alliance: Alliance;
  }

  let { alliance }: Props = $props();

  const { Topics } = Configuration.Settings.NetworkTables;

  let activeCommand = $derived(nt.topics.get(`${Topics.AutoCommand}/active`)?.value ?? "None");
</script>

<div class="main">
  <div class="title"><h4>Auto</h4></div>
  <div>
    <SendableChooser
      name="Auto Command"
      options={ nt.topics.get(`${Topics.AutoCommand}/options`) }
      active={ nt.topics.get(`${Topics.AutoCommand}/active`) } />
  </div>
  <div 
    class="active"
    class:none={ activeCommand === "None" }>
    { activeCommand }
  </div>
  <div 
    class="autos">
    <img src="./assets/images/autos-{ alliance?.toLowerCase() ?? "blue" }.png" alt="" />
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
      font-size: 200%;
      padding: 0.5em 0;

      &.none {
        background: none;
        border: 1px solid var(--app-color-charcoal);
        color: var(--app-color-charcoal);
        font-weight: normal;
      }
    }

    & .autos {
      background: var(--app-color-black);
      width: 400px;
      height: 440px;
      margin-top: 2em;
      
      & img { 
        width: 100%; 
        transform: translateY(30px);
      }
    }
  }
</style>