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
  Button,
} from 'react-component';

//--------------------------------------------------------
// view.
//--------------------------------------------------------
class app extends Component {

  componentWillMount() {
    // Button.style = {marginLeft: 10, backgroundColor: 'red'};
    // Button.textStyle = {fontSize:11};
    // Button.disabledTextStyle = {fontSize:11};
  }

  /**
  * @desc: render.
  * @return: 
  */
  render() {
    return (
      <View style={{backgroundColor:'white'}}>
        <Button style={{marginTop:100,marginLeft:50,width:80}} onPress={()=>console.log('press')}>btn text</Button>
        <Button style={{marginTop:20,marginLeft:50,width:80,backgroundColor:'red'}} onPress={()=>console.log('press')}>btn text</Button>
        <Button disabled={true} style={{marginTop:20,marginLeft:50,width:80}}>btn text</Button>
      </View>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;