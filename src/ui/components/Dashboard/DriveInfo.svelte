<script lang="ts">
  import { Utils } from "../../../common/index.js";
  import { NetworkTablesService as nt } from "../../services/NetworkTables.svelte.js";

  let driveLockState = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/LockPosition")?.value as string);
  let swerveModuleFrontLeftDrivingSpeedTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/FrontLeft/Driving/Speed/Target")?.value as number);
  let swerveModuleFrontLeftDrivingSpeedActual = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/FrontLeft/Driving/Speed/Actual")?.value as number);
  let swerveModuleFrontLeftTurningPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/FrontLeft/Turning/Position")?.value as number);
  let swerveModuleFrontRightDrivingSpeedTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/FrontRight/Driving/Speed/Target")?.value as number);
  let swerveModuleFrontRightDrivingSpeedActual = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/FrontRight/Driving/Speed/Actual")?.value as number);
  let swerveModuleFrontRightTurningPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/FrontRight/Turning/Position")?.value as number);
  let swerveModuleRearLeftDrivingSpeedTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/RearLeft/Driving/Speed/Target")?.value as number);
  let swerveModuleRearLeftDrivingSpeedActual = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/RearLeft/Driving/Speed/Actual")?.value as number);
  let swerveModuleRearLeftTurningPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/RearLeft/Turning/Position")?.value as number);
  let swerveModuleRearRightDrivingSpeedTarget = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/RearRight/Driving/Speed/Target")?.value as number);
  let swerveModuleRearRightDrivingSpeedActual = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/RearRight/Driving/Speed/Actual")?.value as number);
  let swerveModuleRearRightTurningPosition = $derived(nt.topics.get("/SmartDashboard/Robot/Drive/Modules/RearRight/Turning/Position")?.value as number);
</script>

<div class="main">
  <div class="title"><h4>Drive</h4></div>
  <div class="swerveModules">
    <div 
      class="swerveModule" 
      style:background={ `linear-gradient(0deg, rgba(0, 204, 0, 0.33) ${ (swerveModuleFrontLeftDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%, transparent ${ (swerveModuleFrontLeftDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%)` }>
      <div class="value">{ swerveModuleFrontLeftDrivingSpeedActual?.toFixed(3) }</div>
      <div class="delta">{ (swerveModuleFrontLeftDrivingSpeedTarget ? ((swerveModuleFrontLeftDrivingSpeedActual / swerveModuleFrontLeftDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (Utils.radiansToDegrees(swerveModuleFrontLeftTurningPosition ?? 0) - 90) }deg)` }>
        <div class="line"></div>
      </div>
    </div>
    <div 
      class="swerveModule"
      style:background={ `linear-gradient(0deg, rgba(0, 204, 0, 0.33) ${ (swerveModuleFrontRightDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%, transparent ${ (swerveModuleFrontRightDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%)` }>
      <div class="value">{ swerveModuleFrontRightDrivingSpeedActual?.toFixed(3) }</div>
      <div class="delta">{ (swerveModuleFrontRightDrivingSpeedTarget ? ((swerveModuleFrontRightDrivingSpeedActual / swerveModuleFrontRightDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (Utils.radiansToDegrees(swerveModuleFrontRightTurningPosition) ?? 0) }deg)` }>
        <div class="line"></div>
      </div>
    </div>
    <div 
      class="swerveModule"
      style:background={ `linear-gradient(0deg, rgba(0, 204, 0, 0.33) ${ (swerveModuleRearLeftDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%, transparent ${ (swerveModuleRearLeftDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%)` }>
      <div class="value">{ swerveModuleRearLeftDrivingSpeedActual?.toFixed(3) }</div>
      <div class="delta">{ (swerveModuleRearLeftDrivingSpeedTarget ? ((swerveModuleRearLeftDrivingSpeedActual / swerveModuleRearLeftDrivingSpeedTarget) * 100) : 0).toFixed(1) }%</div>
      <div 
        class="position"
        style:transform={ `rotate(${ (Utils.radiansToDegrees(swerveModuleRearLeftTurningPosition ?? 0) + 180) }deg)` }>
        <div class="line"></div>
      </div>
    </div>
    <div 
      class="swerveModule"
      style:background={ `linear-gradient(0deg, rgba(0, 204, 0, 0.33) ${ (swerveModuleRearRightDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%, transparent ${ (swerveModuleRearRightDrivingSpeedActual / (driveSpeedMax ?? 1)) * 100 }%)` }>
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
        border: 2px solid var(--app-color-charcoal);
        border-radius: 55px;
        font-size: 100%;

        & .value {
          margin-top: 0.5em;
          z-index: 1;
          font-size: 120%;
        }

        & .delta {
          font-size: 100%;
          z-index: 1;
        }

        & .position {
          position: absolute;

          & .line {
            width: 8px;
            height: 70px;
            background: var(--app-color-white);
            opacity: 0.4;
          }
        }
      }
    }
  }
</style>