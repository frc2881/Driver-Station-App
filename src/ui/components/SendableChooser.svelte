<script lang="ts">
  import { Dropdown } from "carbon-components-svelte";
  import { NetworkTablesDataType, type NetworkTablesTopic } from "../../common/index.js";
  import { updateNetworkTablesTopics } from "../services/NetworkTables.svelte";

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

  let items: { id: number; text: string; }[] = $derived.by(() => {
    if (options?.value && active?.value) {
      const __items = [];
      let id = 0;
      for (const option of options?.value as Array<string>) {
        __items.push({ id, text: option });
        id += 1;
      }
      return __items;
    } else {
      return [];
    }
  });

  let selectedItemId = $derived.by(() => {
    if (options?.value && active?.value) {
      let id = 0;
      for (const option of options?.value as Array<string>) {
        if (option === active?.value) { return id; }
        id += 1;
      }
    } else {
      return 0;
    }
  });
</script>

<div class="main">
  <Dropdown
    type={ inline ? "inline" : "default" }
    labelText={ name }
    selectedId={ selectedItemId }
    items={ items }
    on:select={ (e: any) => {
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