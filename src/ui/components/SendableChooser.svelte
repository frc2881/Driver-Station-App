<script lang="ts">
  import { run } from 'svelte/legacy';

  import { Dropdown } from "carbon-components-svelte";
  import { NetworkTablesDataType, type NetworkTablesTopic } from "../../common/index.js";
  import { updateNetworkTablesTopics } from "../services/NetworkTables.svelte.js";

  interface Props {
    name: string;
    inline?: boolean;
    options: NetworkTablesTopic | undefined;
    active: NetworkTablesTopic | undefined;
  }

  let {
    name,
    inline = false,
    options,
    active
  }: Props = $props();

  let items: { id: number; text: string; }[] = $state([]);
  let selectedItemId = $state(0);

  run(() => {
    if (options?.value && active?.value) {
      items = [];
      let id = 0;
      for (const option of options?.value as Array<string>) {
        items.push({ id, text: option });
        if (option === active?.value) { selectedItemId = id; }
        id += 1;
      }
    }
  });
</script>

<div class="main">
  <Dropdown
    type={ inline ? "inline" : "default" }
    titleText={ name }
    selectedId={ selectedItemId }
    items={ items }
    on:select={ (e) => {
      updateNetworkTablesTopics([{
        id: 0,
        name: active?.name.replace("/active", "/selected") ?? "",
        type: active?.type ?? NetworkTablesDataType.Raw,
        value: e.detail.selectedItem.text
      }]);
    } } />
</div>

<style>
  .main {
    margin-bottom: 1em;

    & :global(.bx--label) {
      width: 100px;
    }
  }
</style>