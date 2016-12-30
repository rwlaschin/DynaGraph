'use strict';

const utils = require.main.require('./src/utilities');
const color = utils.color;

var express = require('express')
var router = express.Router();

module.exports = {};

console.log( "%s: Loading route".debug, __filename );

router.post('/:chart', function(req,res) {
    res.send("Boom!  Here it is!");
});

/////////////////////////////////////////////////
// exports

module.exports.route = '/chart';
module.exports.router = router;
