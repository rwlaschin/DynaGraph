import PubSub from 'pubsub-js'
import Zenoss from './adapters/Zenoss.js'

var _transitions = {
  "FROM": [',','SELECT'],
  "SELECT": [ 'WHERE', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT',',' ],
  "WHERE": [ 'LIKE', "=", "<", ">", "<=", ">=", "!=" ],
  "AND": [ 'LIKE', "=", "<", ">", "<=", ">=", "!=" ],
  "OR": [ 'LIKE', "=", "<", ">", "<=", ">=", "!=" ],
  "=" : [ 'AND', 'OR', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT' ],
  "<" : [ 'AND', 'OR', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT' ],
  ">" : [ 'AND', 'OR', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT' ],
  "<=" : [ 'AND', 'OR', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT' ],
  ">=" : [ 'AND', 'OR', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT' ],
  "!=" : [ 'AND', 'OR', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT' ],
  "LIKE" : [ 'AND', 'OR', 'FACET', 'TIMESERIES', 'COMPARE', 'LIMIT' ],
  "TIMESERIES": [ 'COMPARE', 'LIMIT' ],
  "COMPARE": [ 'TIMESERIES', 'LIMIT' ]
}

module.exports = new function() {
  var selected = 0;
  var _Adapters = {}, _Entries = [];
  var tokens = new RegExp(
    /(^FROM|SELECT|WHERE|LIKE|AND|OR|[><=!]|FACET|TIMESERIES|COMPARE|LIMIT|'[^']*'|[^,\s]+|[)])/,
    "ig");
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
  // this is user input so it will need to be cleaned
  this.update = function(input) {
    if( !input || input === "" ) {
      return "FROM ";
    }
    return input;
  }
  this.getSuggestion = function(input) {
    if( typeof input !== "string" ) {
      input = "";
    }

    // ------ syntax ------
    // FROM <Tables> SELECT <Fields|Functions|Equations|,> CLAUSE
    // CLAUSE:
    //+ WHERE <Fields> <Conditional> <Fields>
    //+ FACET
    //+ TIMESERIES AUTO (past 5 minutes, past 60 min, past day, etc)
    //+ COMPARE (<NUMBER> hours ago, <NUMBER> days ago, <NUMBER> weeks )
    //+ LIMIT <number>

    var value = [], items = "";
    var matches = input.match(tokens);
    console.log(matches);
    if( matches ) {
      var len = matches.length, position = len;
      var adapter = this.getCurrent.object();
      var match ="";
      while( --position >= 0 ) {
        match = matches[ position ].toUpperCase();
        switch( match ) {
          case "FROM": value = value.concat(adapter.get(["tables"])); break;
          case "SELECT": value = value.concat(adapter.get(["fields","functions"])); break;
          case "WHERE": value = value.concat(adapter.get(["fields"])); break;
          case ">": case "<": case ">=": case "<=": case "!=": case "=":
            value = value.concat(adapter.get(["fields","functions"])); break;
          case "LIKE":
            value = value.concat(adapter.get(["fields"])); break;
          case "TIMESERIES": value = value.concat(["AUTO"]); break;
          case "FACET": value = value.concat(adapter.get(["fields"])); break;
          case "COMPARE": value = adapter.get(["daypart"]); break;
          default:
            items += ( items !== "" ? "|" : "" ) + escapeForRegExp(matches[ position ]);
            continue;
        }
        break;
      }
      if( position < len && items !== "" ) {
        try {
          if( match !== 'LIKE' ) {
          value = appendTransitions(value,items,_transitions[match]);
          } else {
            value = value.concat( _transitions[match] );
          }
        } catch(e) {}
      }
    }
    return value;
  }
  function escapeForRegExp(value) {
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  function appendTransitions(value,items,transitions) {
    var i=value.length, val="", haystack = new RegExp(items,"i");
    while(--i >= 0) {
      val = value[i];
      if( haystack.test( val ) ) {
        value = value.concat( transitions );
        break;
      }
    }
    return value;
  }
}();
