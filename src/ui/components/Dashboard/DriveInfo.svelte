<script lang="ts">
    export let swerveModuleFrontLeftDrivingSpeedTarget: number;
    export let swerveModuleFrontLeftDrivingSpeedActual: number;
    export let swerveModuleFrontLeftTurningPosition: number;
    export let swerveModuleFrontRightDrivingSpeedTarget: number;
    export let swerveModuleFrontRightDrivingSpeedActual: number;
    export let swerveModuleFrontRightTurningPosition: number;
    export let swerveModuleRearLeftDrivingSpeedTarget: number;
    export let swerveModuleRearLeftDrivingSpeedActual: number;
    export let swerveModuleRearLeftTurningPosition: number;
    export let swerveModuleRearRightDrivingSpeedTarget: number;
    export let swerveModuleRearRightDrivingSpeedActual: number;
    export let swerveModuleRearRightTurningPosition: number;
</script>

<div class="main">
  <div class="title"><h4>Drive Performance</h4></div>
  <div class="swerveModules">
    <div class="swerveModule">
      <div>{ swerveModuleFrontLeftDrivingSpeedActual?.toFixed(3) }</div>
      <div class="line"></div>
      <div>{ swerveModuleFrontLeftDrivingSpeedTarget?.toFixed(3) }</div>
    </div>
    <div class="swerveModule">
      <div>{ swerveModuleFrontRightDrivingSpeedActual?.toFixed(3) }</div>
      <div class="line"></div>
      <div>{ swerveModuleFrontRightDrivingSpeedTarget?.toFixed(3) }</div>
    </div>
    <div class="swerveModule">
      <div>{ swerveModuleRearLeftDrivingSpeedActual?.toFixed(3) }</div>
      <div class="line"></div>
      <div>{ swerveModuleRearLeftDrivingSpeedTarget?.toFixed(3) }</div>
    </div>
    <div class="swerveModule">
      <div>{ swerveModuleRearRightDrivingSpeedActual?.toFixed(3) }</div>
      <div class="line"></div>
      <div>{ swerveModuleRearRightDrivingSpeedTarget?.toFixed(3) }</div>
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