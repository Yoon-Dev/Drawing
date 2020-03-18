const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "./main.js"
    },
    module: {
        // rules: [{
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: "babel-loader"
        // }]
        rules: [
          {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
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