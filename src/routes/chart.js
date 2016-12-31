'use strict';

const utils = require.main.require('./src/utilities');
const color = utils.color;

var express = require('express')
var router = express.Router();

module.exports = {};

console.log( "%s: Loading route".debug, __filename );

router.post('/:chart', function(req,res) {
    res.status(200)
       .send("Boom!  Here it is!");
});

router.get('/:chart', function(req,res) {
    res.status(500)
       .send("Route not available");
});

/////////////////////////////////////////////////
// exports

module.exports.route = '/chart';
module.exports.router = router;
