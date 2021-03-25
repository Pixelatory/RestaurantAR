import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const UserComment = props => {

	return(

		<View style={styles.container}>
            
            <View style={styles.top}>
                <Image style={styles.avatarIcon} source={require('../assets/man.png')}/>
                <Text style={styles.user}>{props.name}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>

            <View style={styles.bottom}>
                <Text style={styles.comment}>{props.comment}</Text>
            </View>
             
        </View>

	);

}

export default UserComment;

const styles = StyleSheet.create({

    container: {
        padding: 10,
    },

	top: {
	    flexDirection: 'row',
        alignItems: 'center',
	},

    avatarIcon:{
        width: 30,
        height: 30,
    },

    user:{
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold'
    },

    date:{
        fontStyle: 'italic'
    },

    bottom:{
        alignItems: 'center'
    },

    comment:{
        fontSize: 14,
    }

  });