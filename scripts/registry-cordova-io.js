// json format from http://registry.cordova.io
// "se.sanitarium.cordova.exitapp":{
//    "name":"se.sanitarium.cordova.exitapp",
//    "description":"Implements navigator.app.exitApp on WP8",
//    "dist-tags":{
//       "latest":"1.0.0"
//    },
//    "maintainers":[
//       {
//          "name":"gaqzi",
//          "email":"ba@sanitarium.se"
//       }
//    ],
//    "time":{
//       "modified":"2013-11-06T07:56:10.217Z"
//    },
//    "versions":{
//       "1.0.0":"latest"
//    },
//    "keywords":[
//       "cordova",
//       "terminate"
//    ]
// }

(function() {
    'use strict';
    var clc = require('cli-color'),
        fs = require('fs'),
        moment = require('moment'),
        os = require('os'),
        // prompt = require( 'prompt' ),
        request = require('request'),
        tmp = os.tmpdir(),
        pluginsfile = tmp + '/rc-plugins.json',
        dateFromColorNotication = ['greenBright', 'yellowBright', 'redBright'];

    function printPluginList(obj, filter, platforms) {
        var plugin,
            diff = 0,
            filterRegEx = new RegExp(filter, 'i'),
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
                            console.log('Name:  ' + plugin.name.trim());
                            console.log(clc.cyanBright('Description:  ' + (plugin.description ? plugin.description.trim() : 'No description available.')));
                            // console.log('Platforms:  ' + plugin.platforms);
                            console.log('Version:  ' + plugin['dist-tags'].latest.trim());
                            diff = moment().diff(new Date(plugin.time.modified), 'months' );
                            if( diff > 2 ) {
                                diff = 2;
                            }
                            console.log(clc[dateFromColorNotication[diff]]('Last Modified:  ' + new Date(plugin.time.modified) + ' (' + moment(new Date(plugin.time.modified)).fromNow() +')'));
                            console.log(clc.magentaBright('Url:  http://registry.cordova.io/' + key + '/-/' + key + '-' + plugin['dist-tags'].latest.trim() + '.tgz \n'));
                        }
                    }
                }
            }
        }
    }

    function _fetch(search, platforms) {
        var file = fs.createWriteStream(pluginsfile,'w+'),
            req = request('http://registry.cordova.io/-/all').pipe(file);
            req.on( 'finish', function() {
                var plugins = require(pluginsfile);
                printPluginList(plugins, search, platforms);
            });
    }

    exports.fetch = _fetch;

})();