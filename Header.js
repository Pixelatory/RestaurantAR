import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        borderWidth: 1,
        height: 30,
        padding: 36, 
        alignItems: 'center',
        justifyContent: 'center'
  
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;