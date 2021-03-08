import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import {Button, TouchableOpacity} from 'react-native';
import Login from './Login';

import Banner from './Components/Banner';
import Menu from './Components/Menu';

import styles from './StyleSheets/externalStyleSheet';
import {
GoogleSignin,
GoogleSigninButton,
statusCodes,
} from '@react-native-community/google-signin';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

export default function App() {
	
	const [loggedIn, setloggedIn] = useState(false);
	const [userInfo, setuserInfo] = useState([]);
	
	useEffect(() => {
		GoogleSignin.configure({
			scopes: ['email'],
			webClientId: '93178802929-67lv8cmvdg69u7nut510iokuo1dgok0u.apps.googleusercontent.com',
			offlineAccess: false,
		});
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);
	
	function onAuthStateChanged(user) {
		setuserInfo(user);
		console.log(user);
		if (user) setloggedIn(true);
	}
	
	async function onFacebookButtonPress() {
	    // Attempt login with permissions
	    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

	    if (result.isCancelled) {
			throw 'User cancelled the login process';
	    }

		// Once signed in, get the users AccesToken
		const data = await AccessToken.getCurrentAccessToken();

		if (!data) {
			throw 'Something went wrong obtaining access token';
		}

		// Create a Firebase credential with the AccessToken
		const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

		// Sign-in the user with the credential
		setloggedIn(true);
		return auth().signInWithCredential(facebookCredential);
	}
	
	signIn = async() => {
		try {
		  await GoogleSignin.hasPlayServices();
		  const {accessToken, idToken} = await GoogleSignin.signIn();
		  setloggedIn(true);
		  const credential = auth.GoogleAuthProvider.credential(
			idToken,
			accessToken,
		  );
		  console.log(credential);
		  await auth().signInWithCredential(credential);
		} catch (error) {
			console.error(error);
		}
	};
	
	const signOut = async () => {
		try {
		  auth().signOut().then(() => console.log('User signed out!'));
		  setloggedIn(false);
		  setuserInfo([]);
		} catch (error) {
		  console.error(error);
		}
	};

	
  return (
	<View>
	{!loggedIn && (<GoogleSigninButton
		style={{width: 192, height: 48}}
		size={GoogleSigninButton.Size.Wide}
		color={GoogleSigninButton.Color.Dark}
		onPress={signIn}
	/>)}
	
	{!loggedIn && (<TouchableOpacity onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}><Text>Facebook Login</Text></TouchableOpacity>)}
	{loggedIn && (<TouchableOpacity onPress={signOut}><Text>Log out</Text></TouchableOpacity>)}
	</View>
  );
	
}
