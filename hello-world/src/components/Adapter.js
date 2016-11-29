import PubSub from 'pubsub-js'
import Zenoss from './adapters/Zenoss.js'

module.exports = new function() {
  var selected = 0;
  var _Adapters = {}, _Entries = [];
  var tokens = new RegExp(
    /(^FROM|SELECT|WHERE|LIKE|[><=!]|FACET|TIMESERIES|COMPARE|LIMIT|'[^']*'|[^,\s]+)/,
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
    if( !input || input === "" ) {
      return "";
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
        match = matches[ position ];
        switch( match ) {
          case "FROM":
            value = adapter.get(["tables"]);
            // If values are in the match string, then I need to add ',' and or 'SELECT'
            if( len > 1 ) {
/** REFACTOR into function **/
              var i=value.length, val="", haystack = new RegExp(items,"i");
              while(--i >= 0) {
                val = value[i];
                if( haystack.test( val ) ) {
                  value.push(",");
                  value.push("SELECT");
                  break;
                }
              }
/** REFACTOR into function **/
            }
            break;
          case "SELECT": value = adapter.get(["functions","fields"]); break;
          case "WHERE": value = adapter.get(["fields"]); break;
          case ">": case "<": case ">=": case "<=": case "!=": case "=": case "LIKE":
            value = adapter.get(["fields"]); break;
          case "TIMESERIES": value = "AUTO" ; break;
          case "FACET": value = adapter.get(["fields"]); break;
          case "COMPARE": value = adapter.get(["daypart"]); break;
          default:
            items += "\\b"+match+"\\b" + ( items !== "" ? "|" : "" );
            continue;
        }
        break;
      }
    }
    return value;
  }
}();
