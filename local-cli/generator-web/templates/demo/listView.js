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
  RefreshListView as ListView
} from 'react-component';

//--------------------------------------------------------
// view.
//--------------------------------------------------------
class app extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var dsset = [];
    for (let i = 0; i < 1000; i++) {
      dsset.push('row '+i);
    }

    this.dataSource = ds.cloneWithRows(dsset);
  }

  componentWillMount() {
  }

  /**
  * @desc: render.
  * @return: 
  */
  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <ListView 
          pageSize={35}
          initialListSize={35}
          scrollRenderAheadDistance={100}
          dataSource={this.dataSource}
          renderRow={(rowData) => <Text style={{borderColor:'black',borderWidth:1}}>{rowData}</Text>}
          />
      </View>
    );
  }
}

//--------------------------------------------------------
// exports.
//--------------------------------------------------------

module.exports = app;