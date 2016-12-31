function setupConfig() {
    var local = this;
    var cmdLineArgs = process.argv.slice(2);
    var cmdLineOptions = {
        "configfile":"bamboo" //Default Config File is bamboo.json
    };

    //Define Option Handlers
    this.optionHandlers = {
        "configfile":function() {
            var configData;
            try {
                configData = JSON.parse(cmdLineOptions.configfile);
            } catch(e) {
                configData = require("./" + cmdLineOptions.configfile.toLowerCase() + ".json");
            }

            // Add options to the module scope
            for (var x in configData) {
                if (!configData.hasOwnProperty(x)) { continue; }
                local[x] = configData[x];
            }
        },
        "webpackdevserver":function() { require("../webpack-server.js"); }
    }

    //Convert process.argv array into options object
    for (var x = 0; x < cmdLineArgs.length; x++) {
        if (cmdLineArgs[x].substring(0,1) != "-") { continue; }
        var key = cmdLineArgs[x].split("-").join("");
        cmdLineOptions[key] = (cmdLineArgs[x+1] && cmdLineArgs[x+1].substring(0,1) != "-") ? cmdLineArgs[x+1] : null;;
    }

    //Execute option handlers
    for (var x in cmdLineOptions) {
        if (!cmdLineOptions.hasOwnProperty(x)) { continue; }
        if (typeof this.optionHandlers[x] == "function") {
            this.optionHandlers[x]();
        }
    }
}

// TODO: Implement functionality to load configs based on enviroment.
module.exports = new setupConfig();
