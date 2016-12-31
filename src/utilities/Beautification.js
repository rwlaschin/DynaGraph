
var color = require('colour');

color.setTheme({
  silly: 'rainbow', input: 'grey', verbose: 'blue', prompt: 'grey',
  info: 'green', data: 'grey', help: 'cyan', warn: ['yellow', 'underline'],
  debug: 'cyan', error: 'red bold'
});

module.exports = {
  color : color
};
