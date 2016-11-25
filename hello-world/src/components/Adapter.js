import PubSub from 'pubsub-js'
import Zenoss from './adapters/Zenoss.js'

module.exports = new function() {
  var selected = 0;
  var _Adapters = {}, _Entries = [];
  // this is going to be yuck later ... how to maintain?
  _Adapters[ Zenoss.getEntry().value ] = Zenoss;
  _Entries.push( Zenoss.getEntry() );

  function find(name) {
    var i = _Entries.length-1, item;
    for(;i>=0;i--) {
      item = _Entries[i];
      if( item.value === name ) {
        return { item:item, indx: i };
      }
    }
    return undefined;
  }
  this.setAdapter = function(value) {
    var adapter = find(value);
    if( adapter !== undefined) {
      selected = adapter.indx;
      PubSub.publish('UpdatedAdapter',{ value: value });
      return true;
    }
    console.log('Item ' + value + ' was not found');
  };
  this.getAdapter = function(value) {
    if( Number.isInteger( value ) ) {
      if( Math.abs(value) < _Adapters.length  ) {
        return _Adapters[_Entries[value].value];
      }
    } else if ( typeof value === "string" ) {
      var adapter = _Adapters[value];
      if( adapter !== undefined ) {
        return adapter;
      }
    }
    return this.getCurrent.object(); // return the current one
  };
  this.getEntries = function() {
    return _Entries;
  };
  // Accessor
  this.getCurrent = {
    entry : function() { return _Entries[selected] },
    object : function() { return _Adapters[_Entries[selected].value]; }
  };
}();
