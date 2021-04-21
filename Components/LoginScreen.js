import React, {useEffect, useState} from 'react';

import {TouchableOpacity, View, Text, Image} from 'react-native';

import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function ReviewFullScreen(props) {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  if (!props.user) {
    return (
      <View>
        <Text style={{alignSelf: 'center', fontSize: 26}}>RestaurantAR</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#3b5998',
            padding: 10,
            justifyContent: 'center',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 15,
            borderRadius: 25,
          }}
          onPress={() => onFacebookButtonPress()}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../assets/facebook.png')}
          />
          <Text
            style={{
              paddingLeft: 8,
              position: 'absolute',
              left: 40,
              color: '#FFFFFF',
            }}>
            Facebook Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            padding: 10,
            justifyContent: 'center',
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 25,
          }}
          onPress={() => onGoogleButtonPress()}>
          <Image
            source={require('../assets/google.png')}
            style={{width: 25, height: 25}}
          />
          <Text
            style={{
              paddingLeft: 8,
              position: 'absolute',
              left: 40,
              color: '#333333',
            }}>
            Google Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Text style={{alignSelf: 'center', fontSize: 26}}>RestaurantAR</Text>
      <TouchableOpacity
        onPress={() => auth().signOut()}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 10,
          justifyContent: 'center',
          marginLeft: 30,
          marginRight: 30,
          borderRadius: 25,
        }}>
        <Image
          source={require('../assets/logout.png')}
          style={{width: 25, height: 25}}
        />
        <Text
          style={{
            paddingLeft: 8,
            position: 'absolute',
            left: 40,
            color: '#333333',
          }}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
