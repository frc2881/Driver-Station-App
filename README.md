# Driver Station App

_Note: more complete configuration and usage documentation is TBD_

## Stack

* Electron
* TypeScript
* Svelte
* PostCSS
* Rollup
* Node / npm

## Dependencies

* Volta: <https://docs.volta.sh/guide/getting-started>

## Install / Configuration

* `volta install node`
* `npm install`

## Build / Run

* Run robot simulation or Romi in local environment OR run live robot and connect remotely
* Development
  * `npm run dev` (builds and runs the app locally for development with live UI refresh on edit/save)
* Binary packaging and distribution
  * `npm run package` (builds and packages Windows portable executable file for simple copy distribution to driver station)
* Other
  * See `scripts` section in `package.json` file for more options
