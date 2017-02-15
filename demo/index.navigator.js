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

import {
  Navigator,
} from 'react-web';
Route as Navigator.Route;

//--------------------------------------------------------
// view.
//--------------------------------------------------------
class app extends Component {
  componentWillMount() {
  }

  componentWillUnmount() {
  }

  routeConfig(){
    return (
      <Route path="/" component={Index}>
        <Route path="about" component={About} >
          <Route path="inbox" component={Inbox}/>
          <Route path="messages/:id" component={Message} />
        </Route>
        <Route path="*" component={<View>404</View>}/>
      </Route>
    );
  }

  render() {
    return (
      <Navigator
        ref='nav'
        defaultTitle={{ text: 'Title', }}
        defaultLeftButton={{ text: 'Back', }}
        defaultRightButton={{ text: 'Forward', onPress:()=> Navigator.pop() }} 
        defaultBarTintColor='#2112'
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
      >
        // route 可嵌套定义.
        {routeConfig()}

      </Navigator>
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