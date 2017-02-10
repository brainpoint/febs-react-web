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
  if (__dirname.match(/febs-react-web[\/\\]scripts$/)) {
    // CLI is running from node_modules.
    // This is the default case for all projects created using 'febs-react-web init'.
    return path.resolve(__dirname, '../');
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
    if (fs.existsSync(path.join(pa, 'lib')))
    {
      console.log('rm lib directory');
      febs.file.dirRemoveRecursive(path.join(pa, 'lib'));
      //fs.rmdirSync(path.join(pa, 'febs-react-web'));
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
