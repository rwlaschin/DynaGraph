#!/usr/bin/env node

var util = require('util');

var buffer= [], i=0,
    now=new Date().getTime(); // counts backwards by milliseconds

function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Header line
buffer.push("timestamp,responsetime,bytes");

for( i=0;i < 10000000;i++ ) {
  buffer.push( util.format( "%s, %d, %d", now, getRandomInt(20,30000),getRandomInt(1000000,5000000) ) );
  if( (i != 0) && (i%8196 == 0) ) {
    process.stderr.write( util.format("\r%d",i) );
    console.log( buffer.join("\n") );
    buffer.length = 0;
  }
  now--;
}

process.stderr.write( util.format( "\r%d\nDone\n",i ) );
process.stdout.write( buffer.join("\n") ); // output without trailing new-line
