# Simple SCSS PUG (HTMl) fake notes app

## Usage 

```sh
$ git clone https://github.com/roszpun/fake-app-notes.git
$ cd fake-notes-app
$ npm install
$ npm run production
```
Npm script will compile down dist folder which will contain distribution html, css and js files. In order to open app firstly run ``dist/login.html``. Default login and password: `admin`, `admin`. Any other credentials will fail to log in. It's just a fake frontend validation to present errors and animations.

```dashboard.html``` is an actual fake app. It allows to create, edit and delete notes. Notes are not saved anywhere. All operations are based on stroing data within DOM.

Registartion file is just an example registration form for the app.

### Other commands
```sh
$ gulp
```

Run watchers without vendor prefixes.