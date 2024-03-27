<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { Configuration } from "../../../config";
  import { NetworkTables } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import { NetworkTablesTopic } from "../../../common";
  import { updateNetworkTablesTopics } from "../../stores/NetworkTables";
  
  const { Topics } = Configuration.Settings.NetworkTables;
  let nt: NetworkTables;
  $: { nt = $NetworkTablesStore; }

  let intakeBeltsSpeedTopic: NetworkTablesTopic;
  let intakeWaitTime: NetworkTablesTopic;
  $: { 
    intakeBeltsSpeedTopic = nt.topics.get(`${Topics.IntakeBeltsSpeed}`);
    intakeWaitTime = nt.topics.get(`${Topics.IntakeWaitTime}`);
  }
</script>

<div class="main">
  <div class="title"><h4>Intake</h4></div>
  <div class="controls">
    <NumberInput
      min={ 0 }
      max={ 100 }
      step={ 5 } 
      value={ intakeBeltsSpeedTopic?.value * 100 ?? 0 }
      label="Belts Speed (%)"
      on:change={ (e) => {
        updateNetworkTablesTopics([{
          id: 0,
          name: intakeBeltsSpeedTopic?.name,
          type: intakeBeltsSpeedTopic?.type,
          value: e.detail / 100
        }]);
      } }
    />
    <NumberInput
      min={ 0 }
      max={ 5 }
      step={ 0.005 } 
      value={ intakeWaitTime?.value ?? 0 }
      label="Wait Time (seconds)"
      on:change={ (e) => {
        updateNetworkTablesTopics([{
          id: 0,
          name: intakeWaitTime?.name,
          type: intakeWaitTime?.type,
          value: e.detail
        }]);
      } }
    />
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    .controls {
      display: flex;
      flex-direction: column;
      gap: 2em;
    }
  }
</style>