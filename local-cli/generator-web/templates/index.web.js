/**
 * Sample App
 * https://github.com/brainpoint/febs-react-web
 * @flow
 */

// global.isDebug = true;

//
// react.
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  View,
  Text,
} from 'react-native';

//--------------------------------------------------------
// view.
//--------------------------------------------------------
class app extends Component {
  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View>
        <Text>Hello World!</Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('app', () => app);

if(Platform.OS == 'web'){
  var appdom = document.createElement('div');
  document.body.appendChild(appdom);

  AppRegistry.runApplication('app', {
    rootTag: appdom
  })
}

module.exports = app;