/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactWeb
 */
'use strict';

import React from 'react';
import {extendCreateElement} from 'ReactStyleSheet';

// window.requestAnimationFrame / window.cancelAnimationFrame
var lastTime = 0;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback)=>{
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(()=>{ callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

// proxy origin react createElement
extendCreateElement(React);

// React
export * from 'react';

// Components
export ActivityIndicatorIOS from 'ReactActivityIndicator';
export ActivityIndicator from 'ReactActivityIndicator';
// export DatePicker from 'ReactDatePicker';
export DrawerLayoutAndroid from 'ReactDrawerLayout';
export Image from 'ReactImage';
export ListView from 'ReactListView';
export Linking from 'ReactLinking';
export Modal from 'ReactModal';
export Navigator from 'ReactNavigator';
export PickerIOS from 'ReactPicker';
export Picker from 'ReactPicker';
export ProgressViewIOS from 'ReactProgressView';
export ScrollView from 'ReactScrollView';
export SegmentedControlIOS from 'ReactSegmentedControl';
export SliderIOS from 'ReactSlider';
export Switch from 'ReactSwitch';
export StatusBar from 'ReactStatusBar';
export SwitchAndroid from 'ReactSwitch';
export SwitchIOS from 'ReactSwitch';
export TabBarIOS from 'ReactTabBar';
export Text from 'ReactText';
export TextInput from 'ReactTextInput';
export ToastAndroid from 'ReactToast';
export Toast from 'ReactToast';
export Touchable from 'ReactTouchable';
export TouchableHighlight from 'ReactTouchableHighlight';
export TouchableOpacity from 'ReactTouchableOpacity';
export TouchableWithoutFeedback from 'ReactTouchableWithoutFeedback';
export TouchableBounce from 'ReactTouchableBounce';
export RefreshControl from 'ReactRefreshControl';
export View from 'ReactView';
export ViewPagerAndroid from 'ReactViewPager';
export ViewPager from 'ReactViewPager';
export WebView from 'ReactWebView';


// APIs
export Alert from 'ReactAlert';
export AlertIOS from 'ReactAlert';
export Animated from 'ReactAnimated';
export AppRegistry from 'ReactAppRegistry';
export AsyncStorage from 'ReactAsyncStorage';
export Dimensions from 'ReactDimensions';
export Easing from 'animated/lib/Easing';
export InteractionManager from 'ReactInteractionManager';
export LayoutAnimation from 'ReactLayoutAnimation';
export PanResponder from 'ReactPanResponder';
export PixelRatio from 'ReactPixelRatio';
export StyleSheet from 'ReactStyleSheet';
export Jsonp from 'ReactJsonp';
export Fetch from 'ReactFetch';

// Plugins
export NativeModules from 'ReactNativeModules';
export Platform from 'ReactPlatform';
export processColor from 'ReactProcessColor';


// Match the react-native export signature, which uses CommonJS
// (not ES6), where this works:
//    import ReactNative, {View} from 'react-native';
//    ReactNative.View === View
export default module.exports;
