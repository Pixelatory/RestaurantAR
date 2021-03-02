import React, { version } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Banner from './Banner';
import Dish from './Dish';

export default function App() {

	const foodItems = [
		{name: "Ice-Cream", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.99"},
		{name: "Biryani", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$6.99"},
		{name: "NY Pizza", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$4.99"},
		{name: "Burger", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$9.99"},
		{name: "Pop", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$2.59"},
		{name: "Chicken Tenders", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$7.99"},
		{name: "Water", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$0.99"},
	];


	return (
		<View style={styles.main}>

			<Banner title="MENU" />

			<ScrollView>
				{foodItems.map(entry => (
					<View key={entry.name} style={styles.dishContainer}>
						<Dish name={entry.name} info={entry.info} cost={entry.cost}/>
					</View>
				))}
			</ScrollView>

			<Banner title="TAP DISH TO VIEW 3D MODEL" />

		</View>
	);
}

const styles = StyleSheet.create({

	main: {
		flex: 1,
		justifyContent: 'space-between',	
	},


	dishContainer:{
		alignItems: 'center',
	},

	dish:{
		fontSize: 56,
	}


});
