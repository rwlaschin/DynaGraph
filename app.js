'use strict';

// application entry point
var utils = require.main.require('./src/utilities');
var color = utils.color;

var cluster = require('cluster');

if (cluster.isMaster) {

  // allows restarting of all
  // workers with no downtime
  function restartWorkers() {
    var wid, wids = [];

    for(wid in cluster.workers) {
        wids.push(wid);
    }

    workerIds.forEach(function(wid) {
        cluster.workers[wid].send({
            text: 'shutdown',
            from: 'master'
        });

        setTimeout(function() {
            if(cluster.workers[wid]) {
                cluster.workers[wid].kill('SIGKILL');
            }
        }, 5000);
    });
  };

  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;
  cpuCount = 1; // only load 1
  console.log( "Found %d processors".debug, cpuCount );

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
      var worker = cluster.fork();

      // listening from worker
      // worker.on('message', function(message) { console.log(message); });
      // sending message to worker
      // worker.send('hello from the master');
  }

  cluster.on('exit', function (worker,code,signal) {
    console.log('%s: Worker %d died with code: %d, and signal: %d'.warn, __filename, worker.process.pid, code, signal);
    if( code !== 1 && signal !== 0 ) {
      console.log( "Starting new worker".info );
      cluster.fork();
    }
  });

} else {
  var express = require('express');
  var app = express();
  var port = 3000;

  app.use(express.static(__dirname + '/public'));

  // listening from master
  // process.on('message', function(message) { console.log(message); });
  // send to master
  // process.send('hello from worker with id: ' + process.pid);

  var routes = require("./src/routes")(app);

  // Bind to a port, this needs to be more dynamic
  var server = app.listen(port, function() {
    console.log(" %s: Worker %d (%d) to incoming requests on %d".info,__filename,cluster.worker.id,process.pid,port);
  });
}
