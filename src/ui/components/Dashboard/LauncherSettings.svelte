<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { Configuration, type NetworkTables, type NetworkTablesTopic } from "../../../common/index.js";
  import { NetworkTablesStore, updateNetworkTablesTopics } from "../../stores/NetworkTables.js";
  
  const { Topics } = Configuration.Settings.NetworkTables;
  let nt: NetworkTables;
  $: { nt = $NetworkTablesStore; }

  let launcherArmIntakePositionTopic: NetworkTablesTopic;
  $: { 
    launcherArmIntakePositionTopic = nt.topics.get(`${Topics.LauncherArmIntakePosition}`);
  }
</script>

<div class="main">
  <div class="title"><h4>Launcher</h4></div>
  <div class="controls">
    <NumberInput
      min={ 1 }
      max={ 14.5 }
      step={ 0.1 } 
      value={ launcherArmIntakePositionTopic?.value ?? 0 }
      label="Intake Position"
      on:change={ (e) => {
        updateNetworkTablesTopics([{
          id: 0,
          name: launcherArmIntakePositionTopic?.name,
          type: launcherArmIntakePositionTopic?.type,
          value: e.detail
        }]);
      } }
    />
  </div>
</div>

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    
    & .controls {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }
</style>