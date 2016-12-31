
var rollbar = require("rollbar");

var rollbarAuth = "e56af7a162844e089c22607b1b62e5fb"
var disabled = false;

rollbar.init(rollbarAuth, {
  environment: process.env.NODE_ENV
});

// Rollbar exports
module.exports = {}

module.exports.disable = function() {
  disabled = true;
};

module.exports.enable = function() {
  disabled = false;
};

module.exports.reportCritical = function(msg,request,callback) {
  rollbar.reportMessage(msg,"critical",request,callback);
};

module.exports.reportError = function(msg,request,callback) {
  disabled || rollbar.reportMessage(msg,"error",request,callback);
};

module.exports.reportWarning = function(msg,request,callback) {
  disabled || rollbar.reportMessage(msg,"warning",request,callback);
};

module.exports.reportDebug = function(msg,request,callback) {
  disabled || rollbar.reportMessage(msg,"debug",request,callback);
};

module.exports.reportInfo = function(msg,request,callback) {
  disabled || rollbar.reportMessage(msg,"info",request,callback);
};

module.exports.errorHandler = function() {
  return rollbar.errorHandler(rollbarAuth);
}

module.exports.reportInfo("App load");
