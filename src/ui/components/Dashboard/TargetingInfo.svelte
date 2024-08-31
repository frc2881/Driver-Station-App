<script lang="ts">
  import { type ChartOptions, LineChart, ScaleTypes } from "@carbon/charts-svelte";

  export let targetDistance: number;
  export let targetHeading: number;
  export let targetPitch: number;
  export let launcherArmPositions: string;

  const chartOptions: ChartOptions = {
    axes: {
      bottom: {
        title: "Target Distance (m)",
        mapsTo: "distance",
        scaleType: ScaleTypes.LINEAR,
        domain: [0, 7]
      },
      left: {
        title: "Launcher Position (in)",
        mapsTo: "position",
        scaleType: ScaleTypes.LINEAR,
        domain: [0, 15]
      }
    },
    toolbar: { enabled: false },
    legend: { enabled: false },
    theme: "g100",
    curve: "curveMonotoneX",
    color: { scale: { "launcherArmPositions": "#FF69B4" } }
  };

  let chartData: any[];
  $: {
    if (launcherArmPositions) {
      chartData = JSON.parse(launcherArmPositions);
      chartData?.forEach(e => e.group = "launcherArmPositions");
    }
  }
</script>

<div class="main">
  <div class="title"><h4>Targeting</h4></div>
  <div class="chart">
    <LineChart 
      data={ chartData } 
      options={ chartOptions } />
  </div>
  <div class="targetInfo">
    <div><span class="label">Distance</span>{ targetDistance?.toFixed(3) } m</div>
    <div><span class="label">Heading</span>{ targetHeading?.toFixed(2) } &deg;</div>
    <div><span class="label">Elevation</span>{ targetPitch?.toFixed(2) } &deg;</div>
  </div>
</div>

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    
    & .chart {
      width: 395px;
      height: 160px;
    }

    & .targetInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 180%;
      margin-top: 1.25em;
      gap: 1.5em;

      & .label {
        display: block;
        margin-bottom: .5em;
        font-size: 14px;
        color: var(--app-color-smoke);
      }
    }
  }
</style>