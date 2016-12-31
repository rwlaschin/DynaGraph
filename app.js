'use strict';

// application entry point
const util = require("util");
const utils = require.main.require('./src/utilities');

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multifetch = require('multifetch');
var config = require("./config/config.js");
var app = express();

module.exports = app;

// figure out sampling
app.use( function(req, res, next) {
  var rate = 100/5, value = Math.random();
  utils.env.set('sampleRate', rate ); // 5%
  utils.env.set('sampleValue', value );
  // true is enable sampled events
  utils.env.set('enableSampledActions', utils.env.get("NODE_ENV") === "development" || value <= rate );
  console.log( "Enable Sampled Actions %s", utils.env.get('enableSampledActions') );
  next();
} );

// enable/disable tracking based on sampling
app.use( function(req, res, next) {
  if( utils.env.get('enableSampledActions', true ) ) {
    utils.tracking.enable();
  } else {
    utils.tracking.disable();
  }
  next();
} );

app.use( function(req, res, next) {
  req.requestTime = new Date(); // timing
  utils.tracking.reportDebug(
    util.format("%s Request <%s>", req.requestTime, req.originalUrl )
  );
  next();
} );

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin:true, methods:["GET","PUT","POST","DELETE"], credentials:true }));

// Need to add authentication
// http://passportjs.org/

app.use(express.static(__dirname + '/public'));

// Auto load routes
require( __dirname + "/src/routes")(app);

app.use( function(req, res, next) {
  var delta = (new Date()).getTime() - req.requestTime.getTime();
  utils.tracking.reportDebug(
    util.format("%s Request <%s> Completed in %d ms", req.requestTime, req.originalUrl, delta )
  );
  if( delta > 100 ) {
    utils.tracking.reportWarn( util.format( "Request <%s> took over .1s to complete", req.originalUrl ) );
  } else if( delta > 1000 ) {
    utils.tracking.reportError( util.format( "Request <%s> took over 1s to complete", req.originalUrl ) );
  } else if( delta > 10000 ) {
    utils.tracking.reportCritical( util.format( "Request <%s> took over 10s to complete", req.originalUrl ) );
  }
  next();
} );

app.use(utils.tracking.errorHandler());
app.listen(config.Network.port);
