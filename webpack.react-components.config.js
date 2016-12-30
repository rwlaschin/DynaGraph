process.env.NODE_ENV = "production";

const webpack = require("webpack");
const path = require("path");
const localutils = require("./tools/localutils");

const config = require("./config/config.js");
const nw = config.Client.Network;

var PATHS = {
  components: localutils.buildPackagePaths("./src", /(routes|utilities)/i),
  build: path.join(__dirname, "public/build")
};

module.exports = {
  entry: PATHS.components,
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js/,
      loader: "string-replace",
      exclude: /node_modules/,
      include: __dirname,
      query: {
          search:"{domain}",
          replace:nw.protocol + "//" + nw.domain + (nw.port ? ":"+nw.port : ""),
          flags: "g"
      }
    }, {
      test: /\.js/,
      loaders: [ "babel" ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.json$/,
      loaders: [ "json" ]
    }, {
      test: /\.css$/,
      loaders: [ "css-loader" ]
    }]
  }
};
