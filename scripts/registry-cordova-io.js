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
    "use strict";
    var shell = require("shelljs"),
        // prompt = require( "prompt" ),
        scrap = require('scrap'),
        clc = require('cli-color'),
        tmp = shell.tempdir(),
        pluginsfile = tmp + "/plugins.json",
        url = 'http://plugreg.com',
        plugins = [];

    function printPluginList(obj, filter, platforms) {
        var plugin,
            filterRegEx = new RegExp(filter, "i"),
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
                            shell.echo("Name:  " + plugin.name.trim());
                            shell.echo(clc.cyanBright("Description:  " + (plugin.description ? plugin.description.trim() : "No description available.")));
                            shell.echo("Version:  " + plugin["dist-tags"].latest.trim());
                            shell.echo("Last Modified:  " + new Date(plugin.time.modified));
                            shell.echo(clc.greenBright("Url:  http://registry.cordova.io/" + key + "/-/" + key + "-" + plugin["dist-tags"].latest.trim() + ".tgz \n"));
                        }
                    }
                }
            }
        }
    }

    function _fetch(search, platforms) {
        shell.exec("curl -s -o " + pluginsfile + " http://registry.cordova.io/-/all 2>&1");
        var plugins = require(pluginsfile);
        printPluginList(plugins, search, platforms);
    }

    exports.fetch = _fetch;

})();

