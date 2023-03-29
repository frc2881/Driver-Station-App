# Driver Station App

_Note: more complete configuration and usage documentation is TBD_

## Stack

* Electron
* TypeScript
* Svelte
* PostCSS
* Rollup
* Node
* pnpm

## Dependencies

* Volta: <https://docs.volta.sh/guide/getting-started>

## Install / Configuration

* `volta install node`
* `volta install pnpm`
* `pnpm install`

## Build / Run

* Run robot simulation or Romi in local environment OR run live robot and connect remotely
* Development
  * `pnpm dev` (builds and runs the app locally for development with live UI refresh on edit/save)
* Binary packaging and distribution
  * `pnpm package` (builds and packages Windows portable executable file for simple copy distribution to driver station)
* Other
  * See `scripts` section in `package.json` file for more options
