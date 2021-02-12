import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Dish = props => {
    return (
        <View style={styles.dishView}>

            <View style={styles.nameAndCost}>
                <Text style={{fontSize:30, fontWeight: 'bold', color: 'black',}} >{props.name}</Text>
                <Text style={{fontSize:30, color: 'black',}} >{props.cost}</Text> 
            </View>

            <View>
                <Text style={{fontSize:15, color: 'black',}}>{props.info}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    dishView: {
        flexDirection: 'column',
        width: '100%',
        height: 100,
        alignItems: 'center',
        borderWidth: 1
        
    },

    nameAndCost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

});

export default Dish;