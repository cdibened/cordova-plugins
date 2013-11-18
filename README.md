cordova-plugins
===============

NPM package to list/download available Phonegap plugins from [http://plugins.cordova.io/](http://plugins.cordova.io/) and/or
[http://plugreg.com/](http://plugreg.com/)

Comparison between the two sites:
```
http://plugins.cordova.io        |   http://plugreg.com
-------------------------        |   ------------------
REST API(faster)                 |   No REST API (need to scrape, slower)
~100 plugins                     |   ~220 plugins
no support for platform filter   |   supports platform filter
.tgz plugin tarball URL          |   Git plugin project URL
supports version number          |   No version number
supports modified date           |   No modified date
```


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
    -u         - the url of the repo to use.
                Valid urls are: http://plugreg.com and
                http://plugins.cordova.io. Default is http://plugins.cordova.io

term           - term to use when using the `search` command.
                Wrap the term in quotes if there are spaces.

```

###Examples
cordova-plugins -p ios,android list
- will list all plugins from `http://plugins.cordova.io` (the -p option has no effect)

cordova-plugins -p ios,android -u http://plugreg.com list
- will list all plugins from `http://plugreg.com` that are on the ios and/or android platforms

cordova-plugins search camera
- will list all plugins from `http://plugins.cordova.io` that have the term `camera` in the name or description


###2-Dew

- Hook into cordova-cli `add plugin` command.
- Highlight search term
- Optimize and clean up code


