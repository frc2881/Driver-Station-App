<script lang="ts">
  import CaretUp from "carbon-icons-svelte/lib/CaretUp.svelte";

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
      <div class="value">{ swerveModuleFrontLeftDrivingSpeedActual?.toFixed(2) }</div>
      <div class="delta">{ (swerveModuleFrontLeftDrivingSpeedTarget ? ((swerveModuleFrontLeftDrivingSpeedActual / swerveModuleFrontLeftDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleFrontLeftTurningPosition ?? 0) }deg)` }>
        <div class="arrow"><CaretUp width=32 height=32 /></div>
      </div>
    </div>
    <div class="swerveModule">
      <div class="value">{ swerveModuleFrontRightDrivingSpeedActual?.toFixed(2) }</div>
      <div class="delta">{ (swerveModuleFrontRightDrivingSpeedTarget ? ((swerveModuleFrontRightDrivingSpeedActual / swerveModuleFrontRightDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleFrontRightTurningPosition ?? 0) }deg)` }>
        <div class="arrow"><CaretUp width=32 height=32 /></div>
      </div>
    </div>
    <div class="swerveModule">
      <div class="value">{ swerveModuleRearLeftDrivingSpeedActual?.toFixed(2) }</div>
      <div class="delta">{ (swerveModuleRearLeftDrivingSpeedTarget ? ((swerveModuleRearLeftDrivingSpeedActual / swerveModuleRearLeftDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleRearLeftTurningPosition ?? 0) }deg)` }>
        <div class="arrow"><CaretUp width=32 height=32 /></div>
      </div>
    </div>
    <div class="swerveModule">
      <div class="value">{ swerveModuleRearRightDrivingSpeedActual?.toFixed(2) }</div>
      <div class="delta">{ (swerveModuleRearRightDrivingSpeedTarget ? ((swerveModuleRearRightDrivingSpeedActual / swerveModuleRearRightDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (swerveModuleRearRightTurningPosition ?? 0) }deg)` }>
        <div class="arrow"><CaretUp width=32 height=32 /></div>
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

        .value {
          margin-top: 0.5em;
        }

        .delta {
          font-size: 80%;
        }

        .position {
          position: absolute;

          .arrow {
            color: var(--app-color-pink);
            transform: translateY(-40px);
          }
        }
      }
    }
  }
</style>