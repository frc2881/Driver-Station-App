# Driver Station App

Not Shuffleboard or Elastic. Just a modern web app hosted in Electron for the driver station desktop customized for the current season's game and Lady Cans robot capbilities.

_Note: more complete configuration and usage documentation is TBD_

## Stack

* [Electron](https://www.electronjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Svelte](https://svelte.dev/)
* [IBM Carbon Components](https://svelte.carbondesignsystem.com/)
* [msgpack](https://msgpack.org/)
* [ws (Websockets)](https://github.com/websockets/ws)
* [Rollup](https://rollupjs.org/)
* [Node / npm](https://nodejs.org/en)

## Dependencies

* [Volta](https://docs.volta.sh/guide/getting-started)

## Install / Configuration

* `volta install node`
* `npm install`

## Build / Run

* Run robot simulation in local environment OR run live robot and connect remotely
* Development
  * `npm run dev:local` (builds and runs the app locally for development with live UI refresh on edit/save connecting to localhost)
* Binary packaging and distribution
  * `npm run package` (builds and packages Windows portable executable file for simple copy distribution to driver station)
* Other
  * See `scripts` section in `package.json` file for more options
