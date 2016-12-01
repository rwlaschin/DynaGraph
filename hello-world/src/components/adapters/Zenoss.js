// import React from 'react';
// import PubSub from 'pubsub-js'
// import 'react-dom';
// import { Dropdown, Icon, Input } from 'semantic-ui-react'

// sending events
// PubSub.publish(event,message)

var tables = [ 'Table1', 'Table2' ];
var fields = [ 'field1', 'field2', 'field3', 'field4' ];
var functions = [ 'abs(', 'ave(', 'min(', 'max(', 'sum(' ];
var conditionals = [ '<','>','<=','>=','!=' ];

var Zenoss = function() {
  this.eval = function(query,resultcb) {
    // this is going to be in NSQL which is fake
    // I'll need to translate it into my own grammer
    // and return the result
    resultcb( query, [] );
  };
  this.get = function(keys) {
    var ret = [];
    try {
      var len = keys.length, usedKeys = {};
      for(var i=0;i<len;i++) {
        var key = keys[i].toLowerCase();
        if( key in usedKeys ) { continue; }
        switch( key ) {
          default: break;
          case 'tables': ret = ret.concat(tables); break;
          // this changes based on which tables were selected
          case 'fields': ret = ret.concat(fields); break;
          case 'functions': ret = ret.concat(functions); break;
          case 'conditionals': ret = ret.concat(conditionals); break;
        }
      }
      // Examine the tables and get the correct fields
    }catch(e){

    }
    return ret;
  };
  this.getEntry = function () {
    return { text: "Zenoss", value: "Zenoss" }
  }
}

module.exports = new Zenoss();
