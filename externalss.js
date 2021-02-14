import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//colors of the app
var { Primary } = '#fff'; 
var {Secondary } = '#ggg';
var { BtnTextColor } = '#000';
var { TextColorNormal } = '#111';
var { TextColorSpecial } = '#111';



const external = StyleSheet.create({

    styles: {
      flex: 1,
      backgroundColor: Primary,
      color: TextColorNormal,
      alignItems: 'center',
      justifyContent: 'center',
    },  

    buttonStyle: {
      backgroundColor: Secondary,
      color: BtnTextColor,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:10,
    },

    headings:{
      fontFamily: "sans-serif",
      color: TextColorNormal,
      fontsize: 22,
    },

    subHeadings:{
      fontFamily: "sans-serif",
      color: TextColorNormal,
      fontsize: 18,
    },

    texts:{
      fontFamily: "sans-serif",
      color: TextColorNormal,
      fontsize: 10,
    }

});

  
export default external