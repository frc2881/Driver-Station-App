<script lang="ts">
  import Cone from "carbon-icons-svelte/lib/TrafficCone.svelte";
  import Cube from "carbon-icons-svelte/lib/Cube.svelte";
  import ChevronRight from "carbon-icons-svelte/lib/ChevronRight.svelte";
  import UnknownFilled from "carbon-icons-svelte/lib/UnknownFilled.svelte";
  import { 
    NetworkTablesTopic
	} from "../../../common";

  enum GamePieceType {
    None = "None",
    Cone = "Cone",
    Cube = "Cube"
  }

  export let lightsPattern: NetworkTablesTopic;

  let gamePiece: GamePieceType = GamePieceType.None;

  $: {
    switch (lightsPattern?.value) {
      case GamePieceType.Cone:
      case GamePieceType.Cube:
        gamePiece = lightsPattern.value;
        break;
      default:
        gamePiece = GamePieceType.None;
        break;
    }
  }
</script>

<div class="main">
  { #if gamePiece !== GamePieceType.None }
    <div class="chevron left">
      <ChevronRight width=120 height=120 fill="#FFFFFF" />
    </div>
  { /if }
  { #if gamePiece === GamePieceType.Cone }
    <Cone width=225 height=225 fill="#E88800" stroke="#E88800" />
  { :else if gamePiece === GamePieceType.Cube }
    <Cube width=225 height=225 fill="#5D33D5" stroke="#5D33D5" />
  { :else }
    <UnknownFilled width=225 height=225 fill="#FFFFFF11" />
  { /if }
  { #if gamePiece !== GamePieceType.None }
    <div class="chevron right">
      <ChevronRight width=120 height=120 fill="#FFFFFF" />
    </div>
  { /if }
</div>

<style lang="postcss">
  .main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .chevron {
      position: absolute;
      animation: pulse 1s ease-in-out infinite;

      &.left { left: 30px; }
      &.right { right: 30px; }
    }
  }

  @keyframes pulse {
		0%    { opacity: 0.5; transform: translate(0px, 0);  }
		50%   { opacity: 1; transform: translate(15px, 0); }
		100%  { opacity: 0.5; transform: translate(0px, 0); }
	}
</style>