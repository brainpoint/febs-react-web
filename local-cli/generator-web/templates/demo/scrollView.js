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
  RefreshScrollView as ScrollView
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
        <ScrollView style={{flex:0.2, height:200,width:200,borderColor:'red',borderWidth:1}} contentContainerStyle={{height:400}}>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
        </ScrollView>
      </View>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;