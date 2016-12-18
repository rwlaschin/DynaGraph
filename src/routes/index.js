'use strict';
/*
    Express Routing Documentation - https://expressjs.com/en/guide/routing.html
    // don't quote for reg expressions
    /a/ -> reg expression anything with 'a'
    /.*fly$/ -> reg expression anything with 'fly' at the end
    // quoted
    /users/:userId/books/:bookId -> req.params: { "userId": "34", "bookId": "8989" }
*/

var utils = require.main.require('./src/utilities');
var color = utils.color;
var path = require("path");
var fs = require("fs");

var _routes = {}, _initialized = false;

function init () {
  var fileList = fs.readdirSync( __dirname ).filter(
        function(value) {
          return ( value !== 'index.js' );
        }
      );
  var flen = fileList.length,filePath,requirePath,file;
  for(var index=0;index<flen;index++) {
    file = fileList[index];
    requirePath = "./src/routes/" + path.basename(file,'.js'); // do I need to hard-code this path?
    filePath = requirePath + '.js'; // do I need to hard-code this path?
    console.log( "%s: Found <%s>, adding to loading list".debug, __filename,filePath );
    // note: if there are dupes in filenames this could overwrite
    _routes[file] = { require: requirePath, path : filePath, name: file, module: undefined };
  }
}

function loadRoutes (app) {
  var module, kRoutes = Object.keys(_routes), lRoutes = kRoutes.length, key;
  for(var index=0;index<lRoutes;index++) {
    key = kRoutes[index];
    module = _routes[key].module;
    if( !module ) {
      console.log("%s: Loading route %s from <%s>".debug, __filename, key, _routes[key].require );
      module =
        _routes[key].module = require.main.require( _routes[key].require );
      console.warn( "Adding new route %s", module.route );
      console.warn( "Router Object %s", module.router );
      if( module && module.route && module.router ) {
        app.use( _routes[key].module.route, _routes[key].module.router );
      }
    }
  }
}

init();

module.exports = function(app) {
  if( !_initialized ) {
    loadRoutes(app);

    console.log("%s: Creating Error route".debug,__filename);
    app.get('*', function (req, res) {
      res.send('File not found', 404);
    });
    _initialized = true;
  }

  // for debugging?
  module.exports.get = function(name) {
    var list = []
    if( !name ) {
      Object.keys(_routes).forEach(function(key,index,_routes){
        list.push( this.key.file );
      });
    }else{
      list.push( _routes[file] );
    }
    return list;
  }
}
