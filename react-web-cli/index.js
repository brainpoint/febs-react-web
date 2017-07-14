#!/usr/bin/env node

/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// febs-react-web-cli is installed globally on people's computers. This means
// that it is extremely difficult to have them upgrade the version and
// because there's only one global version installed, it is very prone to
// breaking changes.
//
// The only job of febs-react-web-cli is to init the repository and then
// forward all the commands to the local version of febs-react-web.
//
// If you need to add a new command, please add it to local-cli/.
//
// The only reason to modify this file is to add more warnings and
// troubleshooting information for the `febs-react-web init` command.
//
// Do not make breaking changes! We absolutely don't want to have to
// tell people to update their global version of febs-react-web-cli.
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

'use strict';

var colors = require('colors');
colors.setTheme({  
    silly: 'rainbow',  
    input: 'grey',  
    verbose: 'cyan',  
    prompt: 'red',  
    info: 'green',  
    data: 'blue',  
    help: 'cyan',  
    warn: 'yellow',  
    debug: 'magenta',  
    error: 'red'  
});

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('cross-spawn');
var chalk = require('chalk');
var prompt = require('prompt');
var semver = require('semver');
var febs   = require('febs');

var os = require('os');

var reactnativeVer = '0.42.0';
var is_win = (os.platform().indexOf('win') == 0);

/**
 * Used arguments:
 *   -v --version - to print current version of febs-react-web-cli and febs-react-web dependency
 *   if you are in a RW app folder
 * init - to create a new project and npm install it
 *   --verbose - to print logs while init
 *   --version <alternative febs-react-web package> - override default (https://registry.npmjs.org/febs-react-web@latest),
 *      package to install
 */
var argv = require('minimist')(process.argv.slice(2));

var CLI_MODULE_PATH = function() {
  return path.resolve(
    process.cwd(),
    'node_modules',
    'febs-react-web',
    'local-cli',
    'cli.js'
  );
};

var REACT_WEB_PACKAGE_JSON_PATH = function() {
  return path.resolve(
    process.cwd(),
    'node_modules',
    'febs-react-web',
    'package.json'
  );
};

console.log('');
console.log('-----------------------------------------------------------------'.info);
console.log('*               Create Febs Web Project                         *'.info);
console.log('*     - If occurs the Permission error, solved by follow:       *'.info);
console.log('*             1. '.info + 'chown -R -v username dirname'.prompt + '                   *'.info);
console.log('-----------------------------------------------------------------'.info);
console.log('');

checkForVersionArgument();

var cli;
var cliPath = CLI_MODULE_PATH();
if (fs.existsSync(cliPath)) {
  cli = require(cliPath);
}

// minimist api
var commands = argv._;
if (cli) {
  cli.run();
} else {
  if (commands.length === 0) {
    console.error(
      'You did not pass any commands, did you mean to run `' + 'febs-react-web init'.info + '`?'
    );
    process.exit(1);
  }

  switch (commands[0]) {
  case 'init':
    if (!commands[1]) {
      console.error(
        'Usage: ' + 'febs-react-web init <ProjectName> [--verbose] [--version=0.0.1]'.info
      );
      process.exit(1);
    } else {
      init(commands[1], argv.verbose, argv.version);
    }
    break;
  default:
    console.error(
      'Command `%s` unrecognized. ' +
      'Make sure that you have run `' + 'npm install'.info + '` and that you are inside a febs-react-web project.',
      commands[0]
    );
    process.exit(1);
    break;
  }
}

function validatePackageName(name) {
  if (!name.match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
    console.error(
      '"%s" is not a valid name for a project. Please use a valid identifier ' +
        'name (alphanumeric).',
      name
    );
    process.exit(1);
  }

  if (name === 'React') {
    console.error(
      '"%s" is not a valid name for a project. Please do not use the ' +
        'reserved word "React".',
      name
    );
    process.exit(1);
  }
}

function init(name, verbose, rwPackage) {
  validatePackageName(name);

  if (fs.existsSync(name)) {
    createAfterConfirmation(name, verbose, rwPackage);
  } else {
    createProject(name, verbose, rwPackage);
  }
}

function useCnpmConfirmation(cb) {
  prompt.start();

  var property = {
    name: 'usecnpm',
    message: 'Do you wanna use taobao npm registry?',
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
    default: 'no'
  };

  prompt.get(property, function (err, result) {
    if (result.usecnpm[0] === 'y') {
      console.log('will config registry to https://registry.npm.taobao.org'.verbose);

      exec('npm config set registry "https://registry.npm.taobao.org"', function(e, stdout, stderr) {
        if (e) {
          console.error('npm set registry failed');
          console.error(e);
          process.exit(1);
        }
        cb&&cb();
      });
    } else {
      exec('npm config set registry "https://registry.npmjs.org/"', function(e, stdout, stderr) {
        if (e) {
          console.error('npm set registry failed');
          console.error(e);
          process.exit(1);
        }
        cb&&cb();
      });
    }
  });
}

function installRNCliConfirmation(cb) {
  prompt.start();

  var property = {
    name: 'rncli',
    message: 'Did you already install ' + 'react-native-cli'.info + '?',
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
    default: 'yes'
  };

  prompt.get(property, function (err, result) {
    if (result.rncli[0] === 'n') {
      process.exit(1);
      // console.log('Installing ' + 'react-native-cli'.info + ' package from npm...');
     
      // var proc = spawn('npm', [
      //   'install', 
      //   '-g', 
      //   (is_win ? 'yarn' : ''), 
      //   'react-native-cli'
      //   ], {stdio: 'inherit'});
      // proc.on('close', function (code) {
      //   if (code !== 0) {
      //     console.error('install react-native-cli failed');
      //     console.error(code);
      //     process.exit(1);
      //   }
      //   cb && cb();
      // });
    } else {
      cb && cb();
    }
  });
}

function restoreNpmConfirmation() {
  prompt.start();

  var property = {
    name: 'restorenpm',
    message: 'Do you restore npm registry -> https://registry.npmjs.org/',
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
    default: 'no'
  };

  prompt.get(property, function (err, result) {
    if (result.restorenpm[0] === 'y') {
      console.log('will config registry to https://registry.npmjs.org/'.verbose);
      exec('npm config set registry "https://registry.npmjs.org/"', function(e, stdout, stderr) {
        if (e) {
          console.error('npm set registry failed');
          console.error(e);
          process.exit(1);
        }
      });
    } else {
      
    }
  });
}

function createAfterConfirmation(name, verbose, rwPackage) {
  prompt.start();

  var property = {
    name: 'yesno',
    message: 'Directory ' + name + ' already exists. Continue?',
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
    default: 'no'
  };

  prompt.get(property, function (err, result) {
    if (result.yesno[0] === 'y') {
      createProject(name, verbose, rwPackage);
    } else {
      console.log('Project initialization canceled');
      process.exit();
    }
  });
}

function createProject(name, verbose, rwPackage) {
  var root = path.resolve(name);
  var projectName = path.basename(root);

  useCnpmConfirmation(function(){
    installRNCliConfirmation(function(){
      installReactNative(projectName, reactnativeVer, function(){
        console.log(
          'This will walk you through creating a new [' + 'Febs React Web'.info + '] project in',
          root.info
        );

        if (!fs.existsSync(root)) {
          fs.mkdirSync(root);
        }

        var packageJsonPath = path.join(root, 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
          var packageJson = {
            name: projectName,
            version: '0.0.1',
            private: true,
          };
          fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
        }

        process.chdir(root);

        if (verbose) {
          runVerbose(root, projectName, rwPackage);
        } else {
          run(root, projectName, rwPackage);
        }
      });    
    });
  });
}

function getInstallPackage(rwPackage) {
  var packageToInstall = 'febs-react-web';
  var valideSemver = semver.valid(rwPackage);
  if (valideSemver) {
    packageToInstall += '@' + valideSemver;
  } else if (rwPackage) {
    // for tar.gz or alternative paths
    packageToInstall = rwPackage;
  }
  
  console.log('Installing ' + packageToInstall.info + ' package from npm...');
  return packageToInstall;
}

function run(root, projectName, rwPackage) {
  var proc = spawn('npm', ['install', '--save', '--save-exact', getInstallPackage(rwPackage)], {stdio: 'inherit'});
  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm install --save --save-exact febs-react-web` failed');
      return;
    }

    checkForDependencies(function(err){
      if (!err) {
        var cli = require(CLI_MODULE_PATH());
        cli.init(root, projectName, function(err){
          restoreNpmConfirmation();
        });
      }
    });
  });
}

function runVerbose(root, projectName, rwPackage) {
  var proc = spawn('npm', ['install', '--verbose', '--save', '--save-exact', getInstallPackage(rwPackage)], {stdio: 'inherit'});
  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm install --save --save-exact febs-react-web` failed');
      return;
    }

    checkForDependencies(function(err){
      if (!err) {
        var cli = require(CLI_MODULE_PATH());
        cli.init(root, projectName, function(err){
          restoreNpmConfirmation();
        });
      }
    });
  });
}

function checkForVersionArgument() {
  if (argv._.length === 0 && (argv.v || argv.version)) {
    console.log('febs-react-web-cli: ' + require('./package.json').version);
    try {
      console.log('febs-react-web: ' + require(REACT_WEB_PACKAGE_JSON_PATH()).version);
    } catch (e) {
      console.log('febs-react-web: n/a - not inside a React Web project directory')
    }
    process.exit();
  }
}


function installReactNative(projectName, version, cb) { 
  // react-native.
  console.log('It will take a while...'.input);
  console.log('Creating a ' + 'react-native'.info + (version?'@'+version:'').info + ' project...');
  
  var proc = spawn('react-native', [
    'init',
    projectName,
    (version ? '--version='+version : '')
  ], {stdio: 'inherit'});

  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('install react-native' + (version?'@'+version:'') + ' failed');
      console.error(code);
      process.exit(1);
    } else {
      cb&&cb(code);
    }
  });
}

function checkForDependencies(cb) {
  cb && cb();
  // console.log('Installing dependencies package from npm...');
  // checkForDependenciesPkgVer('react', '15.3.2', false, function(){
  //   checkForDependenciesPkgVer('react-dom', '15.3.2', false, function(){
  //     checkForDependenciesPkgVer('febs-react-component', null, false, function(){
  //       cb && cb();
  //     });
  //   });
  // });
}

function checkForDependenciesPkg(pkgName, jsonFile, verbose, cb) {
  console.log('Installing ' + pkgName.info + ' from npm...');
  var proc = spawn('npm', [
    'install',
    verbose? '--verbose': '',
    pkgName+ (jsonFile? '@' + require(jsonFile).dependencies[pkgName] : ''),
  ], {stdio: 'inherit'});

  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm install`' + pkgName + ' failed');
      cb&&cb(code);
    } else {
      cb&&cb(code);
    }
  });
}


function checkForDependenciesPkgVer(pkgName, version, verbose, cb) {
  console.log('Installing ' + pkgName.info + ' from npm...');
  var proc = spawn('npm', [
    'install',
    verbose? '--verbose': '',
    '--save',
    pkgName+ (version? '@' + version : ''),
  ], {stdio: 'inherit'});

  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm install`' + pkgName + ' failed');
      cb&&cb(code);
    } else {
      cb&&cb(code);
    }
  });
}