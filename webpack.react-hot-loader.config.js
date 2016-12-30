process.env.NODE_ENV = "production";

const webpack = require("webpack");
const path = require("path");
const localutils = require("./tools/localutils");

var PATHS = {
  components: localutils.buildPackagePaths("./src", /(routes|utilities)/i),
  build: path.join(__dirname, "public/build")
};

module.exports = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it"s convenient with more complex configurations.
  entry: {
    components:[
      "webpack-dev-server/client?http://localhost:3001/",
      "webpack/hot/only-dev-server",
      "./src/index.js"
    ]
  },
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js/,
      loaders: ["react-hot", "babel"],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.json$/,
      loaders: ["react-hot","json"]
    }, {
      test: /\.css$/,
      loaders: [ "react-hot","css-loader" ]
    }]
  }
};
