import React from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import Login from './Login';

import Banner from './Components/Banner';
import Menu from './Components/Menu'

import styles from './StyleSheets/externalStyleSheet';


export default function App() {

	


	return (

		<View style={styles.main}>

			<SafeAreaView style={{flex:1}}>
				<Login/>
			</SafeAreaView>

		</View>

	);
}
