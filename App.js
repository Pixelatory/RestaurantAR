import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import {TouchableOpacity} from 'react-native';
import Login from './Login';

import Banner from './Components/Banner';
import Menu from './Components/Menu';

import styles from './StyleSheets/externalStyleSheet';
import {
GoogleSignin,
GoogleSigninButton,
statusCodes,
} from '@react-native-community/google-signin';
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
		  await GoogleSignin.revokeAccess();
		  await GoogleSignin.signOut();
		  setloggedIn(false);
		  setuserInfo([]);
		} catch (error) {
		  console.error(error);
		}
	};

	
  return (
	<>
	{!loggedIn && (<GoogleSigninButton
		style={{width: 192, height: 48}}
		size={GoogleSigninButton.Size.Wide}
		color={GoogleSigninButton.Color.Dark}
		onPress={signIn}
	/>)}
	{loggedIn && (<TouchableOpacity onPress={signOut}><Text>Log out</Text></TouchableOpacity>)}
	</>
  );
	
}
