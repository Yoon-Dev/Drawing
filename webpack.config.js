const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "./main.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }]
      },
    devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
    },
    devtool: "eval-source-map"
  }
  
  module.exports = config;