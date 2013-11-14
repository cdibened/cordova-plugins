cordova-plugins
===============

NPM package to list/download available plugins from [http://plugins.cordova.io/](http://plugins.cordova.io/)

###Installation

`sudo npm install -g cordova-plugins`

###Usage

`cordova-plugins` or `cordova-plugins list`

- list all available plugins

`cordova-plugins search *term`

- search all plugins that contain the search *term

`cordova-plugins [-d *dir] get *plugin-url`

- download the plugin @ \*plugin-url in the specified \*dir or `tmp`


###2-Dew

- Hook into cordova-cli `add plugin` command.
- Highlight search term


