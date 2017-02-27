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
  Icons,
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
        {Icons.getIconArrowLeft({marginLeft:100, marginTop:20})}
        {Icons.getIconCross({marginLeft:100, marginTop:20})}
        {Icons.getIconMinArrowRight({marginLeft:100, marginTop:20})}
        {Icons.getIconMinArrowDown({marginLeft:100, marginTop:20})}
        {Icons.getIconMinArrowLeft({marginLeft:100, marginTop:20})}
        {Icons.getIconClose({marginLeft:100, marginTop:20})}
        {Icons.getIconCloseCircle({marginLeft:100, marginTop:20})}
        {Icons.getIconSearch({marginLeft:100, marginTop:20})}
      </View>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;