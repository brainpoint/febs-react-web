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
var citong = require('citong');

function getRoot() {
  if (__dirname.match(/node_modules[\/\\]citong-react-web[\/\\]scripts$/)) {
    // CLI is running from node_modules.
    // This is the default case for all projects created using 'citong-react-web init'.
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
      citong.file.dirRemoveRecursive(path.join(pa, 'react-web'));
      //fs.rmdirSync(path.join(pa, 'react-web'));
    }

    //fs.symlinkSync(path.join(pa, 'citong-react-web'), path.join(pa, 'react-web'), 'dir');
    console.log('cp citong-react-web -> react-web');

    // brower.
    var arr = [];
    var dirpath = 'citong-react-web';
    var arrFiles = fs.readdirSync(path.join(pa, dirpath));

    var packjson_path = path.join(pa, dirpath + '/scripts/package.json');
    arr.push(packjson_path);

    arrFiles.forEach(function(e) {
      if (e != 'package.json')
        arr.push(path.join(pa, dirpath + '/' + e));
    });

    citong.file.dirAssure(path.join(pa, 'react-web'));

    for (var i = 0; i < arr.length; i++) {
      try {
        var pp = citong.string.replace(arr[i], 'citong-react-web', 'react-web');
        if (citong.file.dirIsExist(arr[i])) {
          //citong.file.dirAssure(pp);
          citong.file.dirAssure(pp);
          dirpath = arr[i];
          arrFiles = fs.readdirSync(dirpath);
          arrFiles.forEach(function(e) {
            arr.push(path.join(dirpath , e));
          });
        } else {
          if (packjson_path == arr[i])
            fs.renameSync(arr[i], path.join(pa, 'react-web/package.json'));
          else
          //citong.file.fileCopy(arr[i], pp);
            fs.renameSync(arr[i], pp);
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
