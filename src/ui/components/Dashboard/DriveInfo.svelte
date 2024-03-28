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
  <div class="title"><h4>Drive</h4></div>
  <div class="swerveModules">
    <div class="swerveModule">
      <div>{ swerveModuleFrontLeftDrivingSpeedActual?.toFixed(2) }</div>
      <div>{ swerveModuleFrontLeftDrivingSpeedTarget?.toFixed(2) }</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleFrontLeftTurningPosition ?? 0) + 90 }deg)` }>
      </div>
    </div>
    <div class="swerveModule">
      <div>{ swerveModuleFrontRightDrivingSpeedActual?.toFixed(2) }</div>
      <div>{ swerveModuleFrontRightDrivingSpeedTarget?.toFixed(2) }</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleFrontRightTurningPosition ?? 0) + 90 }deg)` }>
      </div>
    </div>
    <div class="swerveModule">
      <div>{ swerveModuleRearLeftDrivingSpeedActual?.toFixed(2) }</div>
      <div>{ swerveModuleRearLeftDrivingSpeedTarget?.toFixed(2) }</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleRearLeftTurningPosition ?? 0) + 90 }deg)` }>
      </div>
    </div>
    <div class="swerveModule">
      <div>{ swerveModuleRearRightDrivingSpeedActual?.toFixed(2) }</div>
      <div>{ swerveModuleRearRightDrivingSpeedTarget?.toFixed(2) }</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleRearRightTurningPosition ?? 0) + 90 }deg)` }>
      </div>
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
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25em;
        width: 110px;
        height: 110px;
        border: 2px solid var(--app-color-pink);
        border-radius: 55px;
        font-size: 120%;

        .position {
          position: absolute;
          width: 80px;
          height: 5px;
          background: var(--app-color-white);
          opacity: 0.2;
        }
      }
    }
  }
</style>