const path = require("path");
const common = require("./webpack.config");
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  
});