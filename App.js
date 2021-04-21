import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Banner from './Components/Banner';
import Menu from './Components/Menu';
import FullItemScreen from './Components/FullItemScreen';

import styles from './StyleSheets/externalStyleSheet';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewFullScreen from './Components/ReviewFullScreen';
import LoginScreen from './Components/LoginScreen';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default class App extends Component {
  state = {
    loginScreen: false,
    menuScreen: true,
    fullItemId: null,
    dishes: null,
    categories: null,
    reviewScreen: false,
  };

  constructor(props) {
    super(props);
    this.onAuthStateChanged.bind(this);
  }

  // Fetch the dish and categories data from DB; set JSON response to state
  componentDidMount() {
    fetch('http://159.203.3.150/api/dishes')
      .then((res) => res.json())
      .then((json) => this.setState({dishes: json.response}))
      .catch((err) => console.log(err));

    fetch('http://159.203.3.150/api/categories')
      .then((res) => res.json())
      .then((json) => this.setState({categories: json.response}))
      .catch((err) => console.log(err));

    GoogleSignin.configure({
      webClientId:
        '93178802929-67lv8cmvdg69u7nut510iokuo1dgok0u.apps.googleusercontent.com',
      offlineAccess: false,
    });

    const unsubscribe = auth().onAuthStateChanged((user) => {
      this.onAuthStateChanged(user);
    });

    this.setState({user: auth().currentUser});

    const checkIfReviewTime = async () => {
      try {
        const value = await AsyncStorage.getItem('reviewTime');
        if (value !== null) {
          console.log(JSON.parse(value));
          if (JSON.parse(value) < Date.now()) {
            await AsyncStorage.removeItem('reviewTime');
            this.setState({reviewScreen: true, menuScreen: false});
          }
        }
      } catch (e) {
        throw e;
      }
    };

    checkIfReviewTime();
  }

  onAuthStateChanged(user) {
    this.setState({user: user});
  }

  render() {
    return (
      <View>
        {this.state.loginScreen && <LoginScreen user={this.state.user} />}
        {this.state.reviewScreen && <ReviewFullScreen />}
        {this.state.fullItemId != null && (
          <FullItemScreen
            dishId={this.state.fullItemId}
            close={() => {
              this.setState({fullItemId: null});
            }}
            user={this.state.user}
          />
        )}
        {this.state.menuScreen && (
          <View style={styles.main}>
            <Menu
              open={this.state.menuScreen}
              close={() => this.setState({menuScreen: false})}
              dishes={this.state.dishes}
              categories={this.state.categories}
              fullItem={(num) => this.setState({fullItemId: num})}
            />
            <Banner title="TAP DISH TO VIEW 3D MODEL" />
          </View>
        )}
      </View>
    );
  }
}

PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

// START OF PUSH NOTIF
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    // Add stuff here to do when notification is selected
    notification.finish(PushNotificationIOS.FetchResult.NoData); // iOS Related Stuff
    // },
    // onAction: function (notification) {
    // console.log("ACTION:", notification.action);
    // console.log("NOTIFICATION:", notification);
    // },
    // onRegistrationError: function(err) {
    // console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios', // DO NOT REMOVE THIS LINE, ITS REQUIRED IF FIREBASE IS NOT USED
  // requestPermissions: true,                // Use if using Firebase (For Remote Notifications)
});
// END OF PUSH NOTIF
