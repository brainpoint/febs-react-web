'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var merge = require('webpack-merge');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname);
var config = {
  paths: {
    src: path.join(ROOT_PATH, 'Libraries'),
  }
};

var mergeCommon = merge.bind(null, {
  resolve: {
    alias: {
      'react-native': 'citong-react-web',
      'ReactART': 'react-art'
    },
    extensions: ['', '.js', '.jsx', '.md', '.css', '.png', '.jpg'],
  },
  module: {
    loaders: [{
      test: /\.png$/,
      loader: 'url?limit=100000&mimetype=image/png',
      include: config.paths.demo,
    }, {
      test: /\.jpg$/,
      loader: 'file',
      include: config.paths.demo,
    }, {
      test: /\.json$/,
      loader: 'json',
    }, ]
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      blacklist: ['lib']
    }),
  ]
});

if (NODE_ENV === 'development') {
  var IP = '0.0.0.0';
  var PORT = 3000;
  module.exports = mergeCommon({
    ip: IP,
    port: PORT,
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      'webpack-dev-server/client?http://' + IP + ':' + PORT,
      // 'webpack/hot/only-dev-server',
    ],
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
        }
      }),
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new HtmlPlugin(),
    ],
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: [config.paths.src],
      }],
      loaders: [{
        test: /\.jsx?$/,
        loader: 'react-hot',
        include: [config.paths.src],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react', 'stage-1']
        },
        include: [config.paths.src],
      }]
    }
  });
}

if (NODE_ENV === 'production') {

  module.exports = mergeCommon({
    devtool: 'source-map',
    entry: {
      // tweak this to include your externs unless you load them some other way
      'citong-react-web': ['react-native'],
    },
    output: {
      path: './pages',
      filename: '[name].js',
      sourceMapFilename: '[file].map',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          'NODE_ENV': JSON.stringify('production'),
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
      }),
      new webpack.optimize.CommonsChunkPlugin('citong-react-web', 'citong-react-web.js'),
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react', 'stage-1']
        },
        include: [config.paths.src],
      }]
    }
  });
}
