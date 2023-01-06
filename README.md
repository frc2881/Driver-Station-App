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
* Python 3 (macOS)
* pynetworktables2js

## Dependencies
* Volta: https://docs.volta.sh/guide/getting-started
* pynetworktables2js: https://github.com/robotpy/pynetworktables2js
  * Windows: no additional dependencies (pynetworktables2js executable is embedded in Electron app packaging for driver station deployment)
  * macOS:
    * Homebrew: https://brew.sh/
    * Python3: `brew install python3`
    * pynetworktables2js: `python3 -m pip install pynetworktables2js`

## Install / Configuration
* `volta install node`
* `volta install yarn`
* `yarn install`

## Build / Run
* Run robot simulation or Romi in local environment OR run live robot and connect remotely
* Development
  * `yarn dev` (builds and runs the app with live UI refresh on edit/save)
* Binary packaging and distribution
  * `yarn dist` (builds and packages Windows portable executable file for copy distribution to driver station)
* Other
  * See `scripts` section in `package.json` file for more options

## ToDo
  - Create GitHub project to manage development tasks (externalize configuration, build UI components for views, ...)
  