/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactPlatform
 */

'use strict';

const Platform = {
  OS: 'web',
  select: function(m) {
    return m.web;
  }
};

module.exports = Platform;
