<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import Selectable from "../Selectable.svelte";
  import { NetworkTablesDataType } from "../../../common/index.js";
  import { NetworkTablesService as nt, updateNetworkTablesTopics } from "../../services/NetworkTables.svelte";

  let launcherTestSpeed: number = $derived(nt.topics.get("/Tunables/Robot/Launcher/TestSpeed")?.value ?? 0 as number);
</script>

<div class="main">
  <div class="title"><h4>Settings</h4></div>
    <div class="category">
      <div class="label">Launcher</div>
      <div>
        <NumberInput 
          labelText="Test Speed ( % )"
          min={ 0 }
          max={ 100 }
          step={ 1 } 
          value={ Math.floor(launcherTestSpeed * 100) }
          on:change={ (e: any) => {
            updateNetworkTablesTopics([{
              id: 0,
              name: "/Tunables/Robot/Launcher/TestSpeed",
              type: NetworkTablesDataType.Float,
              value: (e.detail as number) / 100
            }]);
          }} />
      </div>
    </div>
  <!-- <div class="category">
    <div class="label">Drive</div>
    <Selectable
      name="Speed Mode"
      key="/Tunables/Robot/Drive/SpeedMode"
      useInline={ true } />
    <Selectable
      name="Drift Correction"
      key="/Tunables/Robot/Drive/DriftCorrection"
      useToggle={ true } />
    <Selectable
      name="Idle Mode"
      key="/Tunables/Robot/Drive/IdleMode"
      useToggle={ true }
      invertToggle={ true } />
    <Selectable
      name="Orientation"
      key="/Tunables/Robot/Drive/Orientation"
      useInline={ true } />
  </div> -->
</div>

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    
    & .category {
      display: flex;
      flex-direction: column;
      margin: 2em 1em;

      & .label {
        margin: 0 4em 1em 0;
        padding-bottom: .5em;
        font-size: 1.2rem;
        border-bottom: 1px solid var(--app-color-charcoal);
      }
    }
  }
</style>