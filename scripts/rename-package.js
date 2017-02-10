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
'use strict';

var fs = require('fs');
var path = require('path');
var febs = require('febs');

function getRoot() {
  if (__dirname.match(/node_modules[\/\\]febs-react-web[\/\\]scripts$/)) {
    // CLI is running from node_modules.
    // This is the default case for all projects created using 'febs-react-web init'.
    return path.resolve(__dirname, '../../');
  } else {
    return null;
  }
  //return path.resolve(__dirname, '../../');
}

/**
 * Parses the command line and runs a command of the CLI.
 */
function run() {
  var pa = getRoot();
  if (pa) {
    if (fs.existsSync(path.join(pa, 'react-web')))
    {
      console.log('rm react-web directory');
      febs.file.dirRemoveRecursive(path.join(pa, 'react-web'));
    }

    //fs.symlinkSync(path.join(pa, 'febs-react-web'), path.join(pa, 'febs-react-web'), 'dir');
    console.log('cp febs-react-web -> react-web');

    // brower.
    var arr = [];
    var dirpath = 'febs-react-web';
    var arrFiles = fs.readdirSync(path.join(pa, dirpath));

    arrFiles.forEach(function(e) {
      if (e != 'package.json')
        arr.push(path.join(pa, dirpath + '/' + e));
    });

    febs.file.dirAssure(path.join(pa, 'react-web'));

    for (var i = 0; i < arr.length; i++) {
      try {
        var pp = febs.string.replace(arr[i], 'febs-react-web', 'react-web');
        if (febs.file.dirIsExist(arr[i])) {
          //febs.file.dirAssure(pp);
          febs.file.dirAssure(pp);
          dirpath = arr[i];
          arrFiles = fs.readdirSync(dirpath);
          arrFiles.forEach(function(e) {
            arr.push(path.join(dirpath , e));
          });
        } else {
            febs.file.fileCopy(arr[i], pp);
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    console.log('run cli in error directory!');
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  run: run,
};
