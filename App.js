import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Banner from './Components/Banner';
import Menu from './Components/Menu'

import styles from './StyleSheets/externalStyleSheet';


export default function App() {

	



	return (

		<View style={styles.main}>

			<Menu/>

			<Banner title="TAP DISH TO VIEW 3D MODEL"/>

		</View>

	);
}
