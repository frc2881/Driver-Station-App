# Driver Station App

_Note: more complete configuration and usage documentation is TBD_

## Stack:
* Electron
* TypeScript
* Svelte
* PostCSS
* Rollup
* Node
* Yarn

## Dependencies
* Windows 10/11
* Volta: https://docs.volta.sh/guide/getting-started

## Install / Configuration
* `volta install node`
* `volta install yarn`
* `yarn install`

## Build / Run
* Development
  * `yarn dev` (builds and runs the app with live UI refresh on edit/save)
* Binary packaging and distribution
  * `yarn dist` (builds and packages Windows executable for distribution to driver station)
* Other
  * See `scripts` section in `package.json` file for more options

## ToDo
  - Create GitHub project to manage development tasks (externalize configuration, build UI components for views, ...)
  