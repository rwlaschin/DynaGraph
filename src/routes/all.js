'use strict';

const utils = require.main.require('./src/utilities');
const color = utils.color;

var express = require('express');
var router = express.Router();

module.exports = {};

console.log( "%s: Loading route".debug, __filename );

router.all('/', function (req, res) {
    res.status(200)
       .send('Hello World!');
});

/////////////////////////////////////////////////
// exports

module.exports.route = '/all'; // base route
module.exports.router = router;
