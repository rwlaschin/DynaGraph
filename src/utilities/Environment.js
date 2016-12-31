
const color = require("colour");

module.exports = {};

module.exports.get = function(key,def) {
  if( key in process.env ) {
    def = process.env[key];
  }
  console.log( "Getting Environment %s = %s".debug,key,def );
  return def;
}

module.exports.set = function(key,value) {
  console.log( "Setting Environment %s to %s".debug, key, value );
  process.env[key] = value;
}

module.exports.update = function(key,value) {
  var old = module.exports.get(key,"");
  module.exports.set(key,value);
  return old;
}

///////////////////////////////////////////////////
// Basic command-line parsing

var args = (process.argv || ""), arg, item, key, value, accept, equalPos,command;
for(var i=1, len=args.length;i<len;++i) {
  // find the key I want, followed by the values
  // Requires, args are --command key:value
  arg = args[i], accept = true;
  switch( arg.toLowerCase() ) {
    case '--env': case "-e":
      command = 'env';
      equalPos = arg.indexOf("=");
      if( equalPos < 0 ) { continue; }
      arg = arg.substr( equalPos );
    default:
      console.log( "Attempting to process <%s> -> %s".debug, command, arg );
      item = arg.split(":"), key = item[0], value = item[1];
      if( key === "!" ) { accept = false; key.splice(0,1) };
      if (value === undefined) { value = accept; }
      switch(command) {
        case "env": module.exports.set(key,value); continue;
        case "":
          console.log( "Command not set ignoring %s".debug, arg );
          break;
      }
      break;
  }
  // I didn't process anything so stop using this command
  command = "";
}
