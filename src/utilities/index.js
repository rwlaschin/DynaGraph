'use strict';

var color = require('colour');
color.setTheme({
  silly: 'rainbow', input: 'grey', verbose: 'blue', prompt: 'grey',
  info: 'green', data: 'grey', help: 'cyan', warn: ['yellow', 'underline'],
  debug: 'cyan', error: 'red bold'
});

/////////////////////////////////
//
var rollbar = require("rollbar");
var rollbarAuth = "e56af7a162844e089c22607b1b62e5fb"
rollbar.init(rollbarAuth, {
  environment: process.env.NODE_ENV
});

module.exports = {};

/////////////////////////////////////////////////////////
// Exports

module.exports.color = color;

// Rollbar exports
module.exports.rollbar = rollbar;
module.exports.rollbarErrorHandler = function() {
  return rollbar.errorHandler(rollbarAuth);
}

rollbar.reportMessage("App load","info");
