import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View} from 'react-native';

import external from './externalss';

export default function App() {
  
  return (

    <View style={external.sample}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>

  );

}