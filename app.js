'use strict';

// application entry point
var utils = require.main.require('./src/utilities');
var color = utils.color;

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multifetch = require('multifetch');
var config = require("./config/config.js");
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin:true,
    methods:["GET","PUT","POST","DELETE"],
    credentials:true
}))

// Need to add authentication
// http://passportjs.org/

app.use(express.static(__dirname + '/public'));

require( __dirname + "/src/routes")(app);

app.listen(config.Network.port);

module.exports = app;

