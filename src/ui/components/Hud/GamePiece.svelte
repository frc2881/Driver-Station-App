<script lang="ts">
  import Cone from "carbon-icons-svelte/lib/TrafficCone.svelte";
  import Cube from "carbon-icons-svelte/lib/Cube.svelte";
  import ChevronRight from "carbon-icons-svelte/lib/ChevronRight.svelte";
  import { 
    NetworkTablesTopic
	} from "../../../common";

  export let lightsPattern: NetworkTablesTopic;
</script>

<div class="main">
  { #if ["Cone", "Cube"].includes(lightsPattern?.value) }
    <div class="chevron">
      <ChevronRight width=120 height=120 fill="#FFFFFF" />
    </div>
  { /if }
  { #if lightsPattern?.value === "Cone" }
    <Cone width=225 height=225 fill="#E88800" stroke="#E88800" />
  { :else if lightsPattern?.value === "Cube" }
    <Cube width=225 height=225 fill="#5D33D5" stroke="#5D33D5" />
  { /if }
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .chevron {
      animation: pulse 1.5s ease-in-out infinite;
    }
  }

  @keyframes pulse {
		0%    { opacity: 0.5; transform: translate(0px, 0);  }
		50%   { opacity: 1; transform: translate(15px, 0); }
		100%  { opacity: 0.5; transform: translate(0px, 0); }
	}
</style>