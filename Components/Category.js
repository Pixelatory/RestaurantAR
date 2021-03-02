import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Dish from './Dish';

const Category = props => {
    return (
        <View>
            <Text style={{fontSize: 45, fontWeight: 'bold'}}>{props.title}</Text>
            <ScrollView>
				{props.dishes.map(entry => (
					<View key={entry.name} style={styles.dishContainer}>
						<Dish name={entry.name} info={entry.info} cost={entry.cost}/>
					</View>
				))}
			</ScrollView>

        </View>
       		
    );
};

const styles = StyleSheet.create({

});

export default Category;