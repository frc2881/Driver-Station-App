<script lang="ts">
  import { Dropdown } from "carbon-components-svelte";
  import { NetworkTablesTopic } from "../../../common";

  export let options: NetworkTablesTopic;
  export let active: NetworkTablesTopic;
  export let onSelected: any;

  let items: { id: number; text: string; }[] = [];
  let selectedItemId = 0;

  $: {
    const __options = options?.value as Array<string>;
    if (__options) {
      items = [];
      let id = 0;
      for (const option of __options) {
        items.push({ id, text: option });
        if (option === active?.value) { selectedItemId = id; }
        id += 1;
      }
    }
  }
</script>

<div class="main">
  <div class="title"><h4>Auto Command</h4></div>
  <div>
    <Dropdown
      selectedId={ selectedItemId }
      items={ items }
      on:select={ onSelected } />
  </div>
</div>

<style lang="postcss">
</style>