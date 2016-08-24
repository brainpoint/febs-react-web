# Citong React Web

> A framework for building web apps with React Native compatible API.

> 在 [React-web@0.3.2](http://github.com/taobaofed/react-web) 的基础上编写.

> 部署等相关内容查阅 [React-web@0.3.2 README](./README-react-web.md)


### Fix platform differences

#### 1. Native events without direct pageX/pageY on web platform
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

#### 2. Should run application on web platform
  ```js
  AppRegistry.registerComponent('Game2048', () => Game2048);
  if(Platform.OS == 'web'){
    var app = document.createElement('div');
    document.body.appendChild(app);
    AppRegistry.runApplication('Game2048', {
      rootTag: app
    })
  }
  ```

#### 3. Should care about fetch domain on web platform
  ```js
  var Fetch = Platform.OS === 'web'? require('ReactJsonp'): fetch; 
    or
  var Fetch = Platform.OS === 'web'? require('ReactJsonp'): require('ReactFetch');
  ```
  ReactJsonp 只支持jsonp格式: callback({json}), 且只能是get方式.
  ReactFetch 使用XMLHttpRequest, 需处理跨域问题.

#### 4. Without some APIs like `LayoutAnimation` on web platform
  ```js
  var LayoutAnimation = require('ReactLayoutAnimation')
  if(Platform.OS !== 'web'){
    LayoutAnimation.configureNext(...)
  }
  ```

#### 5. Should manually specify the height of ScrollView
  ```js
  <ScrollView style={{height: 235}} horizontal={true} />
  ```

### React Native compatible

#### Components
* ActivityIndicatorIOS - ReactActivityIndicator
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
* PanResponder - ReactPanResponder
* PixelRatio - ReactPixelRatio
* StyleSheet - ReactStyleSheet


#### New Components features
* ActivityIndicator - ReactActivityIndicator
* ViewPagerAndroid - ReactViewPager
    - add method: setPageWithoutAnimation
* WebView - ReactWebView
    对于跨站访问需对应服务器添加 meta http-equiv="Access-Control-Allow-Origin" content="*"; 或者添加至headers中
    goBack/等函数无效.

#### New APIs features
* Platform - ReactPlatform
    - add method: select