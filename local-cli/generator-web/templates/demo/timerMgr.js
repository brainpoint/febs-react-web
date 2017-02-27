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
  TimerMgr,
} from 'react-component';

//--------------------------------------------------------
// view.
//--------------------------------------------------------
class app extends Component {

  constructor(props) {
    super(props);

    // init the timer manager
    this.timerMgr = new TimerMgr();

    // start a timeout.
    this.timerMgr.setTimeout(()=>{}, 10000);

    // start a animationFrame.
    this.timerMgr.requestAnimationFrame((tm)=>{});
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    // dispose the all timer.
    this.timerMgr.dispose();
  }

  /**
  * @desc: render.
  * @return: 
  */
  render() {
    return (
      <View style={{backgroundColor:'white'}}>
        <Text>1. new TimerMgr(); in constructor</Text>
        <Text>2. start a timeout by call 'obj.setTimeout(()=>{}, tm)'</Text>
        <Text>3. start a animationFrame by call 'obj.requestAnimationFrame((tm)=>{})'</Text>
        <Text>4. dispose the all timer in componentWillUnmount</Text>
      </View>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;