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
var co   = require('co');

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
    febs.file.dirAssure(path.join(pa, 'react-web'));

    febs.utils.denodeify(febs.file.dirCopy)(path.join(pa, 'febs-react-web'), path.join(pa, 'react-web'))
      .then(function(){
        console.log('copy dir ok');
      })
      .catch(function(err){
        console.error('copy dir err: ' + err.toString());
      });

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
