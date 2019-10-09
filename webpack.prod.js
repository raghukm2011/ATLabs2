const webpack = require('webpack');
const common = require("./webpack.config");
const merge = require("webpack-merge");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode : 'production',
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
       sourceMap: true
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
 
});