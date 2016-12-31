'use strict';

const color = require("./Beautification");
const environment = require("./Environment");
const tracking = require("./Tracking");

/////////////////////////////////
//
module.exports = {};

function insertIntoExports( name, object ) {
  module.exports[name] = object;
}

/////////////////////////////////////////////////////////
// Exports

insertIntoExports( "color", color );
insertIntoExports( "env", environment );
insertIntoExports( "tracking", tracking );
