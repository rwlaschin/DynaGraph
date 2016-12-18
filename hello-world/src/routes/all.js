'use strict';

var utils = require.main.require('./src/utilities');
var color = utils.color;

var express = require('express');
var router = express.Router();

module.exports = function() {
  console.log( "%s: Loading route".debug, __filename );
  router.all('/', function (req, res) {
    res.send('Hello World!').end();
  });

  module.exports.route = '/';
  console.log( "Route - ", module.exports.route);
  module.exports.router = router;
  console.log( "Router - ", module.exports.router);
}
