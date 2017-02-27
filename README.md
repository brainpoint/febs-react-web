# Febs React Web

[![NPM](https://nodei.co/npm/febs-react-web.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/febs-react-web/)


> A framework for building web apps with React Native compatible API.

> 在 [React-web@0.3.2](http://github.com/taobaofed/react-web) 的基础上编写.

> Febs React Web 项目兼容react-native, 能够以react-native方式编写项目, 并且最终导出html/js方式. 基于reactjs, 构建单页/多页webapp.

## Create a new project

1. Install `npm install febs-react-web-cli -g`
2. Execute `febs-react-web init <ProjectDir>`.
3. Execute `febs-react-web start` that starts the web dev server
4. Execute `febs-react-web bundle` that builds the output.

    ( In Linux system maybe use `sudo` )


## Fix platform differences

1. Native events without direct pageX/pageY on web platform
  ```js
  if (Platform.OS == 'web') {
    var touch = event.nativeEvent.changedTouches[0];
    pageX = touch.pageX;
    pageY = touch.pageY;
  } else {
    startX = event.nativeEvent.pageX;
    startY = event.nativeEvent.pageY;
  }
  ```

2. Should run application on web platform
  ```js
  AppRegistry.registerComponent('app', () => app);
  if(Platform.OS == 'web'){
    var app = document.createElement('div');
    document.body.appendChild(app);
    AppRegistry.runApplication('app', {
      rootTag: app
    })
  }
  ```

3. Should care about fetch domain on web platform
  ```js
  import {
    Fetch,
    Jsonp
  } from 'react-native'
  ```
  Jsonp 只支持jsonp格式: callback({json}), 且只能是get方式.
  Fetch 使用XMLHttpRequest, 需处理跨域问题.


4. Without some APIs like `LayoutAnimation` on web platform
  ```js
  var LayoutAnimation = require('ReactLayoutAnimation')
  if(Platform.OS !== 'web'){
    LayoutAnimation.configureNext(...)
  }
  ```

5. Should manually specify the height of ScrollView
  ```js
  <ScrollView style={{height: 235}} horizontal={true} />
  ```

## React Native compatible

#### Components

* ActivityIndicatorIOS - ReactActivityIndicator
* ActivityIndicator - ReactActivityIndicator
* DatePickerIOS - ReactDatePicker *TODO*
* DrawerLayoutAndroid - ReactDrawerLayout
* Image - ReactImage
* ListView - ReactListView
* Modal - ReactModal
* Navigator - ReactNavigator
* PickerIOS ReactPicker
* ProgressViewIOS - ReactProgressView
* ScrollView - ReactScrollView
* SegmentedControlIOS - ReactSegmentedControl
* SliderIOS - ReactSlider
* Switch - ReactSwitch
* SwitchAndroid - ReactSwitch
* SwitchIOS - ReactSwitch
* RefreshControl - ReactRefreshControl
* TabBarIOS - ReactTabBar
* Text - ReactText
* TextInput - ReactTextInput
* ToastAndroid - ReactToast
* Touchable - ReactTouchable
* TouchableHighlight - ReactTouchableHighlight
* TouchableOpacity - ReactTouchableOpacity
* TouchableWithoutFeedback - ReactTouchableWithoutFeedback
* View - ReactView
* ViewPagerAndroid - ReactViewPager

#### APIs

* Alert - ReactAlert
* AlertIOS - ReactAlert
* Animated - ReactAnimated
* AppRegistry - ReactAppRegistry
* AsyncStorage - ReactAsyncStorage
* Dimensions - ReactDimensions
* Easing - ReactEasing
* InteractionManager - ReactInteractionManager
* LayoutAnimation - ReactLayoutAnimation
* PanResponder - ReactPanResponder
* PixelRatio - ReactPixelRatio
* StyleSheet - ReactStyleSheet


#### New Components features
* ActivityIndicator
* ViewPagerAndroid
    - add method: setPageWithoutAnimation
* WebView
    - 对于跨站访问需对应服务器添加 meta http-equiv="Access-Control-Allow-Origin" content="*"; 或者添加至headers中
    - goBack/等函数无效.
* Picker
    - 增加一个isRenderSelect:bool属性, 表明是否按照web select方式渲染.
* Fetch
    - 增加timeout选项.
* Navigator
    - 增加 pushRouteToFront(route, cb) 方法, 允许添加一个route到顶层, 且不刷新页面, 添加完成后调用cb()
    - 为导航方法如pop,push等添加一个cb参数, 当导航完成时调用.
* ScrollView
    - 增加scrollTo动画.

#### New APIs features
* Platform
    - add method: select
* window.requestAnimationFrame
* window.cancelAnimationFrame
