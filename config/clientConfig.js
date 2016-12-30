var data = require("./client.json");

function clientConfig() {
    var self = this;

    this.getDataForId = function(field, id) {
        if (!(field in data)) { return false; }
        for (var key in data[field]) {
            if (data[field][key].id == id) {
                return data[field][key];
            }
        }
    }
    this.getData = function(field) {
        return data[field];
    }
    this.getDataForKey = function(field, key) {
        return data[field][key];
    }
}

module.exports = new clientConfig();