cordova-plugins
===============

NPM package to list/download available Phonegap plugins from [http://registry.cordova.io/](http://registry.cordova.io/) and/or
[http://plugreg.com/](http://plugreg.com/)

Comparison between the two repos:

http://plugreg.com | http://registry.cordova.io
--- | ---
REST API | REST API
~1300 plugins | ~450 plugins
Git plugin project URL | .tgz plugin tarball URL
Supports platform filter | No support for platform filter
Supports version number | Supports version number
Supports modified date | Supports modified date


*Modified date is color coded to give an indication on the activity.

Bright Green - activity within the previous month

Bright Yellow - activity between 1 and 2 months ago

Bright Red - activity more than 2 months ago


###Installation

`sudo npm install -g cordova-plugins`


###Usage

cordova-plugins [options] command [term]
```
commands:
    list       - display all available plugins
    search     - search plugins for a specfic term/phrase

options:
    -p         - comma delimited (no spaces) platforms to filter by.
                Valid platforms are: ios, android, blackberry10, wp7, wp8, firefoxos.
                Default is all.
    -r         - the url/name of the repo to use.
                Valid urls are: http://plugreg.com (shortform plugreg) and
                http://registry.cordova.io (shortform cordova).
                Default is http://registry.cordova.io

term           - term to use when using the `search` command.
                Wrap the term in quotes if there are spaces.

```

###Examples
cordova-plugins -p ios,android list

- will list all plugins from `http://registry.cordova.io` (the -p option has no effect)

cordova-plugins -p ios,android -u http://plugreg.com (or plugreg) list

- will list all plugins from `http://plugreg.com` that are on the ios and/or android platforms

cordova-plugins search camera

- will list all plugins from `http://registry.cordova.io` that have the term `camera` in the name or description.  The search term matches will be highlighted and CAPITALIZED to notice easier.

###Changed
Commandline argument `-u` has been changed to `-r` to reflect the naming convention of repo instead of url.

###New
Support for default `repo` url. Valid urls are: `http://plugreg.com` (shortform `plugreg`) and `http://registry.cordova.io` (shortform `cordova`). Default is `http://registry.cordova.io`.

Support to customize output foreground colors. Currently you can change the color of the `url` and `description` output.  This is done by creating a `.cordova-plugins` valid JSON file in your HOME directory.

Ex:
```
{
    "repo": "plugreg",
    "urlColor": "blue",
    "descriptionColor": "whiteBright"
}
```

Supported colors are (taken from https://github.com/medikoo/cli-color):

<table>
  <tbody>
    <tr><td>black</td><td><img src="http://medyk.org/colors/000000.png" width="30" height="30" /></td></tr>
    <tr><td>red</td><td><img src="http://medyk.org/colors/800000.png" width="30" height="30" /></td></tr>
    <tr><td>green</td><td><img src="http://medyk.org/colors/008000.png" width="30" height="30" /></td></tr>
    <tr><td>yellow</td><td><img src="http://medyk.org/colors/808000.png" width="30" height="30" /></td></tr>
    <tr><td>blue</td><td><img src="http://medyk.org/colors/000080.png" width="30" height="30" /></td></tr>
    <tr><td>magenta</td><td><img src="http://medyk.org/colors/800080.png" width="30" height="30" /></td></tr>
    <tr><td>cyan</td><td><img src="http://medyk.org/colors/008080.png" width="30" height="30" /></td></tr>
    <tr><td>white</td><td><img src="http://medyk.org/colors/c0c0c0.png" width="30" height="30" /></td></tr>
    <tr><td>blackBright</td><td><img src="http://medyk.org/colors/808080.png" width="30" height="30" /></td></tr>
    <tr><td>redBright</td><td><img src="http://medyk.org/colors/ff0000.png" width="30" height="30" /></td></tr>
    <tr><td>greenBright</td><td><img src="http://medyk.org/colors/00ff00.png" width="30" height="30" /></td></tr>
    <tr><td>yellowBright</td><td><img src="http://medyk.org/colors/ffff00.png" width="30" height="30" /></td></tr>
    <tr><td>blueBright</td><td><img src="http://medyk.org/colors/0000ff.png" width="30" height="30" /></td></tr>
    <tr><td>magentaBright</td><td><img src="http://medyk.org/colors/ff00ff.png" width="30" height="30" /></td></tr>
    <tr><td>cyanBright</td><td><img src="http://medyk.org/colors/00ffff.png" width="30" height="30" /></td></tr>
    <tr><td>whiteBright</td><td><img src="http://medyk.org/colors/ffffff.png" width="30" height="30" /></td></tr>
  </tbody>
</table>

###Future Considerations

- Hook into cordova-cli `add plugin` command.
- Optimize and clean up code