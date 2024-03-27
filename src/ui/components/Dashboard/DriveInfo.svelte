<script lang="ts">
    export let swerveModuleFrontLeftMetrics: string;
    export let swerveModuleFrontRightMetrics: string;
    export let swerveModuleRearLeftMetrics: string;
    export let swerveModuleRearRightMetrics: string;
</script>

<div class="main">
  <div class="title"><h4>Drive Performance</h4></div>
  <div class="swerveModules">
    <div class="swerveModule">
      <div>{ 0 } m/s</div>
      <div class="line"></div>
      <div>{ 0 } rpm</div>
    </div>
    <div class="swerveModule">
      <div>{ 0 } m/s</div>
      <div class="line"></div>
      <div>{ 0 } rpm</div>
    </div>
    <div class="swerveModule">
      <div>{ 0 } m/s</div>
      <div class="line"></div>
      <div>{ 0 } rpm</div>
    </div>
    <div class="swerveModule">
      <div>{ 0 } m/s</div>
      <div class="line"></div>
      <div>{ 0 } rpm</div>
    </div>
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }

    .swerveModules {
      display: grid;
      grid-template-columns: repeat(2, auto);
      gap: 1em;
      width: 100%;
      justify-content: center;
      margin-top: 1em;

      .swerveModule {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 110px;
        height: 110px;
        border: 2px solid var(--app-color-pink);
        border-radius: 55px;

        .line {
          width: 40px;
          height: 1px;
          background: var(--app-color-charcoal);
          margin: 5px 0;
        }
      }
    }
  }
</style>