import React from 'react';
import { StyleSheet} from 'react-native';

//colors of the app
var { Primary } = '#fff'; 
var {Secondary } = '#ggg';
var { BtnTextColor } = '#000';
var { TextColorNormal } = '#111';
var { TextColorSpecial } = '#111';

const styles = StyleSheet.create({
 
    // App
    main: {
		flex: 1,
		justifyContent: 'space-between',	
	},

	dishContainer:{
		alignItems: 'center',
	},

	dish:{
		fontSize: 56,
	},

    
    // Dish
    dishContainer: {
        height: 65,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },

    dishNameLogo:{
        flexDirection: 'row',
    },

    tapLogo: {
        width: 15, 
        height: 15,
        paddingTop: 10,
    },

    dishName: {
        flex: 10,
        fontSize:20, 
        fontWeight: 'bold',
        color: 'black', 
    },

    dishInfo:{
        fontSize:15, 
        color: 'black', 
    },

    nameAndCost: {
        justifyContent: 'space-between',
        width: '100%',
    },


    // Menu
    topNav: {
        flexDirection: 'row',
    },

    searchBar: {
        flex: 1,
        margin: 5,
        paddingHorizontal: 15,
        height: 40,
        fontSize: 18,
        borderWidth: 1.5,
        borderRadius:150,
        backgroundColor: "#F0F0F0",
        borderColor: "#F09133",
    },

  
    // Banner
    header: {
        width: '100%',
        borderWidth: 1,
        height: 16,
        padding: 24, 
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerTitle: {
        color: 'black',
        fontSize: 18
    }

});

export default styles;