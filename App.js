import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Banner from './Components/Banner';
import Category from './Components/Category'
import SearchBar from './Components/SearchBar'



export default function App() {


	const entrees = [
		{name: "Butter Chicken", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.99"},
		{name: "Palak Paneer", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$6.99"},
		{name: "Rogan Josh", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$4.99"},
		{name: "Spicy Prok Vindaloo", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$9.99"},
	];

	const starters = [
		{name: "Indian Onion", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.99"},
		{name: "Veg Kabab", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$6.99"},
		{name: "Paneer 65", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$4.99"},
	];

	const pizza = [
		{name: "Chicago Pizza", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.99"},
		{name: "New York Piza", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$6.99"},
		{name: "Gree Pizza", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$4.99"},
	];



	return (

		<View style={styles.main}>
			<SearchBar/>

			<ScrollView>
				<Category title="Entrees"  dishes={entrees}/>
				<Category title="Desserts" dishes={starters}/>
				<Category title="Pizza" dishes={pizza}/>
			</ScrollView>

			<Banner title="TAP DISH TO VIEW 3D MODEL"/>

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