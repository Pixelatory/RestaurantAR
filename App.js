import React, { version } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from './Header';
import Dish from './Dish';

export default function App() {

	const foodItems = [
		{name: "Ice-Cream", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.59"},
		{name: "Biryani", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.59"},
		{name: "NY Pizza", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.59"},
		{name: "Burger", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.59"},
		{name: "Pop", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.59"},
		{name: "Chicken Tenders", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.59"},
		{name: "Water", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.59"},
	];


	return (
		<View style={styles.main}>

			<Header title="MENU" />

			<ScrollView>
				{foodItems.map(entry => (
					<View style={styles.dishContainer} key={entry}>
						<Dish name={entry.name} info={entry.info} cost={entry.cost}/>
					</View>
				))}
			</ScrollView>

			<Header title="TAP DISH TO VIEW 3D MODEL" />


					

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



})
