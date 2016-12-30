const webpack = require('webpack');
const path = require('path');

const PATHS = {
  components: path.join(__dirname, '/components/'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    components:[
      "webpack-dev-server/client?http://localhost:3000/",
      "webpack/hot/only-dev-server",
      PATHS.components
    ]
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules|css$/,
      include: __dirname
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
