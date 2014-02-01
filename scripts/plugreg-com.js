// new JSON REST Response
// {
//     "username": "aliokan",
//     "project": "cordova-plugin-admob",
//     "name": "AdMobPlugin",
//     "description": "Google AdMob Plugin",
//     "engines": [
//         "cordova : >=2.9.0"
//     ],
//     "platforms": [
//         "android",
//         "ios"
//     ],
//     "keywords": [
//     ],
//     "url": "https://github.com/aliokan/cordova-plugin-admob.git"
// }

(function() {
    'use strict';
    var clc = require('cli-color'),
        exit = require('exit'),
        fs = require('fs'),
        moment = require('moment'),
        os = require('os'),
        ping = require('ping'),
        // prompt = require( 'prompt' ),
        request = require('request'),
        tmp = os.tmpdir(),
        pluginsfile = tmp + '/pr-plugins.json',
        host = 'plugreg.com',
        url = 'http://'+host+'/api/plugins',
        urlColor = 'magentaBright',
        descriptionColor = 'cyanBright',
        searchMatchColor = clc.inverse,
        dateFromColorNotication = ['greenBright', 'yellowBright', 'redBright'];

    function printPluginList(obj, filter, platforms) {
        var plugin,
            diff = 0,
            filter = filter || "",
            filterRegEx = new RegExp(filter, 'ig'),
            matchedPlatform = true,
            checkPlatform = function( val ) {
                return ( this.platforms.indexOf( val.toLowerCase() ) !== -1 );
            };
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key !== '_updated') {
                    plugin = obj[key];
                    if (!filter || (filter &&
                        (filterRegEx.test(plugin.name)) || (plugin.description && filterRegEx.test(plugin.description)))) {
                        if( platforms && platforms.length > 0 ) {
                            // if( filter ) {
                                // matchedPlatform = platforms.every( checkPlatform, plugin );
                            // }
                            // else {
                                matchedPlatform = platforms.some( checkPlatform, plugin );
                            // }
                        }
                        if( matchedPlatform ) {
                            console.log('Name:  ' + plugin.name.replace(filterRegEx, searchMatchColor( filter.toUpperCase() )));
                            console.log(descriptionColor('Description:  ' +
                                (plugin.description ? plugin.description.trim().replace(filterRegEx, searchMatchColor( filter.toUpperCase() )) : 'No description available.')));
                            console.log('Platforms:  ' + plugin.platforms);
                            console.log('Version:  ' + ( plugin.version ? plugin.version.trim() : "No version available." ) );
                            if( plugin.modified ) {
                                diff = moment().diff(new Date(plugin.modified), 'months' );
                                if( diff > 2 ) {
                                    diff = 2;
                                }
                                console.log(clc[dateFromColorNotication[diff]]('Last Modified:  ' + new Date(plugin.modified) + ' (' + moment(new Date(plugin.modified)).fromNow() +')'));
                            }
                            else {
                                console.log(clc.redBright('Last Modified:  No modified date available.'));
                            }
                            console.log(urlColor('Url:  ' + plugin.url + '\n'));
                        }
                    }
                }
            }
        }
    }

    function _fetch(search, platforms, userconfig) {
        ping.sys.probe(host, function(isAlive){
            if(!isAlive) {
                console.log(clc.whiteBright(url) + clc.redBright(' is not reachable.'));
                exit(1);
            }
        });
        urlColor = clc[(userconfig && userconfig.urlColor) || urlColor];
        descriptionColor = clc[(userconfig && userconfig.descriptionColor) || descriptionColor];
        var file = fs.createWriteStream(pluginsfile,'w+'),
            req = request(url).pipe(file);
        req.on( 'finish', function() {
            var plugins = require(pluginsfile);
            printPluginList(plugins, search, platforms);
        });
    }

    exports.fetch = _fetch;

})();