"use strict;"

var color = require('colour');
var glob = require("glob");
var util = require("util");

module.exports.buildPackagePaths = function ( workingdir, filterExpression ) {
  var filterPaths = ( !filterExpression )
        ? function(){ return true; }
        : function(value) { return filterExpression.test( value ) === false; }

  var options = { };
  // recursive search for .js or .jsx
  var paths = glob.sync( workingdir + "/**/*.js?(x)", options).filter( filterPaths ) || [];
  return paths;
}
