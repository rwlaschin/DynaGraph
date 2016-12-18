'use strict';

var utils = require.main.require('./src/utilities');
var color = utils.color;

var express = require('express')
var router = express.Router();

module.exports = function() {
  console.log( "%s Loading route".debug, __filename );
  app.route('/:chart')
    .post( function(req,res) {
      res.send("Boom!  Here it is!");
    });

  // exports
  module.exports.route = '/chart';
  module.exports.router = router;
}
