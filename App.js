import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import Rating from './Components/UserCommentRating';

export default function App(){


	const items = ['Cheeseburger', 'Pizza', 'Nuggets']
	const desc = [
		'A cheeseburger is a hamburger topped with cheese. Traditionally, the slice of cheese is placed on top of the meat patty. The cheese is usually added to the cooking hamburger patty shortly before serving, which allows the cheese to melt.',
		'Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven,',
		'A chicken nugget is a food product consisting of a small piece of deboned chicken meat that is breaded or battered, then deep-fried or baked',
	]

	const [index, setIndex] = useState(0);

	function decrement (){
		setIndex(index==0?items.length-1:index-1)
	}
	
	function increment(){
		setIndex(((index+1)%items.length))
	}

	const [text, onChangeText] = React.useState("");

	return (

			<View style={{backgroundColor: 'white', flex:1}}>
				
				<View style={styles.dishNameContainer}>
					<Text style={styles.dishName}>{items[index]}</Text>
				</View>
	
				<View style={styles.dishWindowContainer}>

					<TouchableOpacity onPress={decrement} style={{width: "10%",  alignItems: 'center', justifyContent: 'center'}}>
						<Image source={require('./assets/left-arrow.png')} style={{width: 10, height: 10, marginVertical: 150}} />
					</TouchableOpacity>

					<Text style={{width: "80%"}}>{ items[index] }</Text>

					<TouchableOpacity onPress={increment} style={{width: "10%", alignItems: 'center', justifyContent: 'center'}}>
						<Image source={require('./assets/right-arrow.png')} style={{width: 10, height: 10,  marginVertical: 150}} />
					</TouchableOpacity>
	
				</View>
	
				<View style={styles.descContainer}>
					<Text>
						{desc[index]}
					</Text>
				</View>
	
				<View style={styles.user}>
					<Image source={require('./assets/man.png')} style={{width: 20, height: 20}}/>
					<Text style={{width: "80%"}}>Name</Text>
				</View>
				
	
				<View style={styles.rating}>
					<Rating />
				</View>
	
				<View style={styles.commentContainer}>
					<TextInput style={styles.comment} onChangeText={onChangeText} value={text}/>
				</View>

				<View style={styles.submitButton}>
					<Button title="Submit"/>
				</View>
	
			 </View>
	
	);
	
	
}


const styles = StyleSheet.create({

	dishNameContainer:{
		flex: 0.1,
	},

	dishName:{
		textAlign: 'center',
		fontSize: 36,
	},

	dishWindowContainer:{
		flexDirection: 'row',
		flex: 0.75,
		justifyContent: 'space-around',	
	},

	descContainer:{
		flex: 0.15,
		padding: 5,
	},

	user:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 5,
	},

	rating:{
		flexDirection: 'row',
		flex: 0.2,
		
	},

	commentContainer:{
		flex: 0.3,
		borderWidth: 1,
		borderColor: "#FF9933",
		margin: 5,
	},

	comment:{
		color: 'black'
	},

	submitButton:{
		alignSelf: 'center',
		width: 240,
	}

});

