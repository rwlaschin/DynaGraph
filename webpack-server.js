// Setup webpack dev server 
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.react-hot-loader.config');
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    proxy: { "*": "http://localhost:3000" },
    historyApiFallback: true
}).listen(3001, 'localhost', function (err, result) {
    if (err) { return console.log(err); }
});