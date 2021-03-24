const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    //  you should know that the HtmlWebpackPlugin by default will generate its own index.html
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Nya',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    contentBase: '../dist',
  },
});
