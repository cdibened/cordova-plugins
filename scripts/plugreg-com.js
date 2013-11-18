// <blockquote data-platforms="android,ios">
//                 <p><a href="/plugin/edewit/aerogear-pushplugin-cordova">AeroGear PushPlugin</a></p>
//                 <small>by edewit</small>
//             </blockquote>
//
//
// <div class="page-header plugin">
//          <h1>AdMobPlugin <small>by aliokan</small></h1>
//      </div>
//      <div class="description">
//          Google AdMob Plugin
//      </div>
//      <div class="well well-sm description">

//              The description within the <a target="_blank" href="https://raw.github.com/aliokan/cordova-plugin-admob/master/plugin.xml">plugin.xml</a> for AdMobPlugin is very short.<br/>

//          More information could be available on the <a href="https://github.com/aliokan/cordova-plugin-admob" target="_blank">GitHub README</a>.
//      </div>
//      <div class="install description">
//          <h4>Install AdMobPlugin using the <a href="http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface" target="_blank">Cordova CLI</a>:</h4>
//          <p>$ cordova plugin add https://github.com/aliokan/cordova-plugin-admob.git</p>
//      </div>

(function() {
    'use strict';
    var clc = require('cli-color'),
        moment = require('moment'),
        // prompt = require( 'prompt' ),
        scrap = require('scrap'),
        url = 'http://plugreg.com',
        plugins = [];

    function printPluginList(obj, filter, platforms) {
        var plugin,
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
                            console.log('Name:  ' + plugin.name);
                            console.log(clc.cyanBright('Description:  ' + plugin.description));
                            console.log('Platforms:  ' + plugin.platforms);
                            //console.log('Version:  ' + plugin['dist-tags'].latest.trim());
                            //console.log('Last Modified:  ' + new Date(plugin.time.modified));
                            console.log(clc.magentaBright('Url:  ' + plugin.url + '\n'));
                        }
                    }
                }
            }
        }
    }

    var _fetch = function(search, platforms) {
        scrap(url + '/plugins', function(err, $) {
            var platforms;
            $('blockquote').each(function(idx, element) {
                var plugin = {};
                plugin.name = element.children[1].children[0].children[0].data.trim();
                platforms = element.attribs['data-platforms'];
                if (!platforms) {
                    platforms = [];
                }
                else {
                    platforms = element.attribs['data-platforms'].toLowerCase().split(',');
                }
                plugin.platforms = platforms;
                plugin.loc = element.children[1].children[0].attribs.href;
                scrap('http://plugreg.com' + plugin.loc, function(err, $) {
                    var description = $('div[class=\'description\']')[0].children[0].data || '';
                    plugin.description = description.trim() === '' ? 'No description available.' : description.trim();
                    var url = $('div.install.description')[0].children[3].children[0].data;
                    url = url.substring(url.indexOf('http'));
                    plugin.url = url;
                    plugins.push(plugin);
                });
            });
        });
        setTimeout(function() {
            printPluginList(plugins, search, platforms);
        }, 15000);
    };

    exports.fetch = _fetch;

})();

