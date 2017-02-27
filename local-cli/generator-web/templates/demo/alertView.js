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
  Text,
  TouchableOpacity
} from 'react-native';

import {
  AlertView,
  TimerMgr
} from 'react-component';

//--------------------------------------------------------
// view.
//--------------------------------------------------------
class app extends Component {

  constructor(props) {
    super(props);
    this.timerMgr = new TimerMgr();
  }

  componentWillUnmount() {
    this.timerMgr.dispose();
  }

  componentDidMount() {
    AlertView.showAlert('Enter Component');
  }

  /**
  * @desc: function.
  * @return: 
  */
  showAlert()     { AlertView.showAlert('show alert'); }
  hideAlert()     { AlertView.hideAlert(); }

  showLoading()   { 
    AlertView.showLoading('show loading, will hide in 2s');
    this.timerMgr.setTimeout(()=>{
      this.hideLoading();
    }, 2000);
  }
  hideLoading()   { AlertView.hideLoading(); }

  toast()         { AlertView.toast('show toast'); }

  /**
  * @desc: render.
  * @return: 
  */
  render() {
    return (
      <AlertView style={{backgroundColor:'white'}}>
        
        {/* alert */}
        <TouchableOpacity style={{marginTop:20, marginLeft:20}} onPress={(ev)=>this.showAlert()}>
          <Text>Press to Show Alert.</Text>
        </TouchableOpacity>

        {/* loading */}
        <TouchableOpacity style={{marginTop:20, marginLeft:20}} onPress={(ev)=>this.showLoading()}>
          <Text>Press to Show loading.</Text>
        </TouchableOpacity>

        {/* toast */}
        <TouchableOpacity style={{marginTop:20, marginLeft:20}} onPress={(ev)=>this.toast()}>
          <Text>Press to Show toast.</Text>
        </TouchableOpacity>

      </AlertView>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;