#!/usr/bin/env node

(function() {
    "use strict";
    var path = require("path"),
        fs = require("fs"),
        exit = require("exit"),
        nopt = require("nopt"),
        shell = require("shelljs"),
        // prompt = require( "prompt" ),
        clc = require('cli-color'),
        scrap = require('scrap'),
        tmp = shell.tempdir(),
        knownOpts = {
            "platforms": String,
            "url": String
        },
        shortHands = {
            "p": ["--platforms"],
            "u": ["--url"]
        },
        parsed = nopt(knownOpts, shortHands, process.argv, 2),
        plugreg = require('../scripts/plugreg-com'),
        registrycordova = require('../scripts/registry-cordova-io'),
        args = process.argv.splice(2);

    if (args.length === 0) {
        shell.echo( "");
        shell.echo( "cordova-plugins [options] command [term]");
        shell.echo( "");
        shell.echo( "   commands:");
        shell.echo( "       list       - display all available plugins");
        shell.echo( "       search     - search plugins for a specfic term/phrase ");
        shell.echo( "");
        shell.echo( "   options:");
        shell.echo( "       -p         - comma delimited (no spaces) platforms to filter by.");
        shell.echo("                    Valid platforms are: " + clc.redBright( "ios android blackberry10 wp7 wp8 firefoxos" ) + "." );
        shell.echo("                    Default is all.");
        shell.echo( "       -u         - the url of the repo to use.");
        shell.echo("                    Valid urls are: "+ clc.yellowBright( "http://plugreg.com") + " and ");
        shell.echo("                    " + clc.yellowBright("http://plugins.cordova.io") + ". Default is http://plugins.cordova.io");
        shell.echo( "");
        shell.echo( "   term           - term to use when using the `search` command.");
        shell.echo("                    Wrap the term in quotes if there are spaces.");
        shell.echo( "\nexample: cordova-plugins -p ios,android list");
        shell.echo( "");
    }
    else {
        var platforms = (parsed.platforms ? parsed.platforms.split(',') : []),
            url = parsed.url,
            command = parsed.argv.remain[0],
            plugin = parsed.argv.remain[1];

        switch (command.toLowerCase()) {
        case "list":
        case "search":
            if( url && ( url.toLowerCase().indexOf( "plugreg" ) !== -1 ) ) {
                plugreg.fetch(plugin,platforms);
            }
            else {
                registrycordova.fetch(plugin,platforms);
            }
            break;
        // case "get":
            // directory = directory || tmp;
            // shell.exec("curl -s -o " + directory + plugin.substring(plugin.lastIndexOf("/")) + " " + plugin + " 2>&1");
            // shell.echo(directory + plugin.substring(plugin.lastIndexOf("/")));
            // break;
        default:
        }
    }
})();