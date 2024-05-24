<script lang="ts">
  import { Utils } from "../../../common";

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
      <div class="value">{ swerveModuleFrontLeftDrivingSpeedActual?.toFixed(3) }</div>
      <div class="delta">{ (swerveModuleFrontLeftDrivingSpeedTarget ? ((swerveModuleFrontLeftDrivingSpeedActual / swerveModuleFrontLeftDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (Utils.radiansToDegrees(swerveModuleFrontLeftTurningPosition ?? 0) - 90) }deg)` }>
        <div class="line"></div>
      </div>
    </div>
    <div class="swerveModule">
      <div class="value">{ swerveModuleFrontRightDrivingSpeedActual?.toFixed(3) }</div>
      <div class="delta">{ (swerveModuleFrontRightDrivingSpeedTarget ? ((swerveModuleFrontRightDrivingSpeedActual / swerveModuleFrontRightDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (Utils.radiansToDegrees(swerveModuleFrontRightTurningPosition) ?? 0) }deg)` }>
        <div class="line"></div>
      </div>
    </div>
    <div class="swerveModule">
      <div class="value">{ swerveModuleRearLeftDrivingSpeedActual?.toFixed(3) }</div>
      <div class="delta">{ (swerveModuleRearLeftDrivingSpeedTarget ? ((swerveModuleRearLeftDrivingSpeedActual / swerveModuleRearLeftDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (Utils.radiansToDegrees(swerveModuleRearLeftTurningPosition ?? 0) + 180) }deg)` }>
        <div class="line"></div>
      </div>
    </div>
    <div class="swerveModule">
      <div class="value">{ swerveModuleRearRightDrivingSpeedActual?.toFixed(3) }</div>
      <div class="delta">{ (swerveModuleRearRightDrivingSpeedTarget ? ((swerveModuleRearRightDrivingSpeedActual / swerveModuleRearRightDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (Utils.radiansToDegrees(swerveModuleRearRightTurningPosition ?? 0) + 90) }deg)` }>
        <div class="line"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .main {
    & .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }

    & .swerveModules {
      display: grid;
      grid-template-columns: repeat(2, auto);
      gap: 1em;
      width: 100%;
      justify-content: center;
      margin-top: 1em;

      & .swerveModule {
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
        font-size: 100%;

        & .value {
          margin-top: 0.5em;
          z-index: 9999;
          font-size: 120%;
        }

        & .delta {
          font-size: 100%;
          z-index: 9999;
        }

        & .position {
          position: absolute;

          & .line {
            width: 3px;
            height: 80px;
            background: var(--app-color-pink);
            opacity: 0.5;
          }
        }
      }
    }
  }
</style>