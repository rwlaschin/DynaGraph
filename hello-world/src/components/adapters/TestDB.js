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

module.exports = function() {
  module.exports.eval = function(query,resultcb) {
    // this is going to be in NSQL which is fake
    // I'll need to translate it into my own grammer
    // and return the result
    resultcb( query, [] );
  };
  module.exports.get = function(keys) {
    var ret = [];
    try {
      var len = keys.length, usedKeys = {};
      for(var i=0;i<len;i++) {
        var key = keys[i].toLowerCase();
        if( key in usedKeys ) { continue; }
        switch( key ) {
          default: break;
          case 'tables': ret += tables; break;
          // this changes based on which tables were selected
          case 'fields': ret += fields; break;
          case 'functions': ret += functions; break;
          case 'separator': ret += ','; break;
          case 'conditionals': ret +=  conditionals ; break;
          case 'openarguments': ret +=  '(' ; break;
          case 'closearguments': ret +=  ')' ; break;
        }
      }
      // Examine the tables and get the correct fields
    }catch(e){

    }
    return ret;
  };
  module.exports.getEntry = function () {
    return { text: "TestDB", value: "SqlLite" }
  }
}
