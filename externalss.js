import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//two main colors of the app
var { Primary } = '#fff'; 
var {Secondary } = '#ggg';

const external = StyleSheet.create({
    sample: {
      flex: 1,
      backgroundColor: Primary,
      color: Secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },  
});

  
export default external