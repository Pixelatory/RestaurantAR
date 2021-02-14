import React from 'react';
import {Text, View, ImageBackground, Image } from 'react-native';

var bkgd =  require('./bg.jpg');
var logo = require('./logo.png');

export default class SplashScreen extends Component{

    
    render(){
        return(
            <ImageBackground source={bg} style={{height:'100%'}}>
                <View style={{justifyConstent:'center', alignItems:'center'}}>
                    <Image style={{height:100}}></Image>
                </View>
            </ImageBackground>
            

        );
    }
}