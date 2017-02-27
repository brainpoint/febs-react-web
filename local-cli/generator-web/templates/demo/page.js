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
  Page,
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
      <Page horizontal={true} style={{backgroundColor:'white'}}>
        <View><Text>page 1</Text></View>
        <View><Text>page 2</Text></View>
        <View><Text>page 3</Text></View>
        <View><Text>page 4</Text></View>
        <View><Text>page 5</Text></View>
        <View><Text>page 6</Text></View>
      </Page>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;