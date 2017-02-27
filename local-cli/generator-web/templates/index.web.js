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
  Navigator,
  Button
} from 'react-component';
const Route = Navigator.Route;


import DemoAlertView from './demo/alertView';
import DemoButton    from './demo/button';
import DemoIcons     from './demo/icons';
import DemoListView  from './demo/listView';
import DemoPage      from './demo/page';
import DemoScrollView from './demo/scrollView';
import DemoTableViewCell from './demo/tableViewCell';
import DemoTimerMgr from './demo/timerMgr';

//--------------------------------------------------------
// view.
//--------------------------------------------------------

class Home extends Component {
  render() {
    return (
      <View>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoAlertView')}>Demo AlertView</Button>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoButton')}>Demo Button</Button>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoIcons')}>Demo Icons</Button>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoListView')}>Demo ListView</Button>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoPage')}>Demo Page</Button>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoScrollView')}>Demo ScrollView</Button>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoTableViewCell')}>Demo TableViewCell</Button>
        <Button style={{marginTop:10}} onPress={()=>Navigator.push('/DemoTimerMgr')}>Demo TimerMgr</Button>
        <Button style={{marginTop:10}} disabled={true}>Demo Navigator see this page</Button>
      </View>
      );
  }
}

class _404 extends Component {
  render() {
    return (<View>404</View>);
  }
}

//--------------------------------------------------------
// demo view.
//--------------------------------------------------------
class app extends Component {
  /**
  * @desc: router
  * @return: 
  */
  routeConfig(){
    return (
      <Route path="/" component={Home} barTitle={{text:'home'}}>
        <Route path="DemoAlertView"     component={DemoAlertView}   barTitle={{text:'DemoAlertView'}}/>
        <Route path="DemoButton"        component={DemoButton}      barTitle={{text:'DemoButton'}}/>
        <Route path="DemoIcons"         component={DemoIcons}       barTitle={{text:'DemoIcons'}}/>
        <Route path="DemoListView"      component={DemoListView}    barTitle={{text:'DemoListView'}}/>
        <Route path="DemoPage"          component={DemoPage}        barTitle={{text:'DemoPage'}}/>
        <Route path="DemoScrollView"    component={DemoScrollView}  barTitle={{text:'DemoScrollView'}}/>
        <Route path="DemoTableViewCell" component={DemoTableViewCell} barTitle={{text:'DemoTableViewCell'}}/>
        <Route path="DemoTimerMgr"      component={DemoTimerMgr}    barTitle={{text:'DemoTimerMgr'}}/>
        <Route path="*" component={_404} />
      </Route>
    );
  }
  
  /**
  * @desc: render.
  * @return: 
  */
  render() {
    return (
      <Navigator
        defaultBarTitle={{ text: 'This is Title', }}
        defaultBarLeftButton={{ text: 'Back', onPress:()=>Navigator.pop() }}
        defaultBarTintColor='#2112'
        configureScene={Navigator.SceneConfigs.PushFromRight}
        >
        {this.routeConfig()}
      </Navigator>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

AppRegistry.registerComponent('app', () => app);

if(Platform.OS == 'web'){
  var appdom = document.createElement('div');
  document.body.appendChild(appdom);

  AppRegistry.runApplication('app', {
    rootTag: appdom
  })
}

module.exports = app;