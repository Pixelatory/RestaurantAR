import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Banner from './Components/Banner';
import Menu from './Components/Menu'

import styles from './StyleSheets/externalStyleSheet';

import FullItemScreen from './Components/FullItemScreen';

export default function App() {

	return (
		<FullItemScreen dishId='0'/>
	);
	
}