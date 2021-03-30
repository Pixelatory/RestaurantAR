/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";


AppRegistry.registerComponent(appName, () => App);

PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

// START OF PUSH NOTIF
PushNotification.configure({
    onRegister: function (token) {
    console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      // Add stuff here to do when notification is selected

      notification.finish(PushNotificationIOS.FetchResult.NoData);   // iOS Related Stuff  
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
    requestPermissions: Platform.OS === 'ios'   // DO NOT REMOVE THIS LINE, ITS REQUIRED IF FIREBASE IS NOT USED
    // requestPermissions: true,                // Use if using Firebase (For Remote Notifications)
});
// END OF PUSH NOTIF

PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    channelId: "channel-id",
    message: "You Tryna Review or What?", // (required)
    date: new Date(Date.now() + 5 * 1000), 
    // allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    });