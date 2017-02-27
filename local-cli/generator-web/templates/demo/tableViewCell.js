/**
 * Sample App
 * https://github.com/brainpoint/febs-react-web
 * @flow
 */

//
// react.
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Platform,
  View,
  Text
} from 'react-native';

import {
  TableViewCell,
  Icons
} from 'react-component';

//--------------------------------------------------------
// view.
//--------------------------------------------------------
class app extends Component {

  componentWillMount() {
  }

  /**
  * @desc: render.
  * @return: 
  */
  render() {
    return (
      <View style={{backgroundColor:'white'}}>
        <TableViewCell
          left={{text:'cell1'}}
          right={Icons.getIconMinArrowDown()}
        />
        <TableViewCell
          left={{text:'cell2'}}
          right={Icons.getIconMinArrowRight()}
        />
      </View>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;