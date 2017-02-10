/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 */
'use strict';

var path = require('path');
var chalk = require('chalk');
var spawn = require('cross-spawn');
var easyfile = require('easyfile');
var packageJson = require('../../package.json');

function installDev(projectDir, verbose, cb) {
  var proc = spawn('npm', [
    'install',
    verbose? '--verbose': '',
    '--save-dev',
    'webpack@' + packageJson.dependencies['webpack'],
    'webpack-dev-server@' + packageJson.dependencies['webpack-dev-server'],
    'babel-loader@' + packageJson.devDependencies['babel-loader'],
    'json-loader@' + packageJson.devDependencies['json-loader'],
    'react-hot-loader@' + packageJson.devDependencies['react-hot-loader'],
    'haste-resolver-webpack-plugin@' + packageJson.devDependencies['haste-resolver-webpack-plugin'],
    'webpack-html-plugin@' + packageJson.devDependencies['webpack-html-plugin'],
    'babel-preset-react-native@' + packageJson.devDependencies['babel-preset-react-native'],
    'babel-preset-stage-1@' + packageJson.devDependencies['babel-preset-stage-1']
  ], {stdio: 'inherit'});

  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm install` failed');
      return;
    } else {
      console.log(chalk.green.bold('To run your app on browser:'));
      console.log(chalk.green('   cd ' + projectDir));
      console.log(chalk.green('   febs-react-web start'));
    }

    cb(code);
  });
}

module.exports = function(projectDir, config, cb) {

  var root = config.getRoot();

  // webpack.config.js.
  var src = path.join(__dirname, 'templates/webpack.config.js');
  var dest = path.join(root, 'web/webpack.config.js');
  easyfile.copy(src, dest, {
    force: true,
    backup: true,
  });
    
  // template.html.
  src = path.join(__dirname, 'templates/template.html');
  dest = path.join(root, 'web/template.html');
  easyfile.copy(src, dest, {
    force: true,
    backup: true,
  });
  
  // index.web.js
  src = path.join(__dirname, 'templates/index.web.js');
  dest = path.join(root, 'index.web.js');
  easyfile.copy(src, dest, {
    force: true,
    backup: true,
  });

  process.chdir(root);
  installDev(projectDir, false, cb);
}
