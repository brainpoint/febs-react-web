'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var IP = '0.0.0.0';
var PORT = 3000;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');
var PROD = 'production';
var DEV = 'development';
let isProd = NODE_ENV === 'production';

var config = {
  paths: {
    src: path.join(ROOT_PATH, '.'),
    index: path.join(ROOT_PATH, 'index.web'),
  },
};

var webpackConfig = {
  ip: IP,
  port: PORT,
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  resolve: {
    alias: {
      'react-native': 'ReactWeb',
    },
    extensions: ['', '.js', '.web.js', '.ios.js', '.android.js', '.native.js', '.jsx'],
  },
  entry: isProd ? {
    bundle: config.paths.index,
    vendor: ["react", "react-dom", "react-native"]
  } : [
    'webpack-dev-server/client?http://' + IP + ':' + PORT,
    'webpack/hot/only-dev-server',
    config.paths.index,
  ],
  output: {
    publicPath:'/',
    path: path.join(__dirname, 'output'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(
      isProd ? {
        output: {
          comments: false,  // remove all comments
        },
        compress: {
          warnings: false
        },
        sourceMap: false 
      } : {
        output: {
          comments: true,  // remove all comments
          beautify: true,
        },
        compress: false,
        mangle : false,
        sourceMap: true,       
      }
    ),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web']
    }),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify(isProd ? PROD : DEV) } }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.NoErrorsPlugin(), // allow error not to interrupt app
    new HtmlPlugin({
      template: './web/template.html'
    }),
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.jsx?$/,
      loader: 'react-hot',
      include: [config.paths.src],
      exclude: [/node_modules/]
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['react-native', 'stage-1']
      },
      include: [config.paths.src],
      exclude: [path.sep === '/' ? /(node_modules\/(?!react))/ : /(node_modules\\(?!react))/]
    }, { 
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=8192'
    }]
  }
};
webpackConfig.resolve.alias[path.basename(ROOT_PATH, '.')] = path.join(ROOT_PATH, '.');

module.exports = webpackConfig;
