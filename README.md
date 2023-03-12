# Driver Station App

_Note: more complete configuration and usage documentation is TBD_

## Stack

* Electron
* TypeScript
* Svelte
* PostCSS
* Rollup
* Node
* Yarn

## Dependencies

* Volta: <https://docs.volta.sh/guide/getting-started>

## Install / Configuration

* `volta install node`
* `volta install yarn`
* `yarn install`

## Build / Run

* Run robot simulation or Romi in local environment OR run live robot and connect remotely
* Development
  * `yarn dev` (builds and runs the app locally for development with live UI refresh on edit/save)
* Binary packaging and distribution
  * `yarn package` (builds and packages Windows portable executable file for simple copy distribution to driver station)
* Other
  * See `scripts` section in `package.json` file for more options
