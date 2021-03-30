import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView} from 'react-native';

import Dish from './Dish'

import styles from '../StyleSheets/externalStyleSheet';

class Menu extends Component {
  state = {
    search: '',
  };

  filterList(list) {
    return list.filter(
      (listItem) =>
        listItem.name
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        listItem.name.toLowerCase().includes(this.state.search.toLowerCase()),
    );
  }
  
  render() {

    const entrees = [
      {name: "Butter Chicken", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$5.99"},
      {name: "Palak Paneer", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$6.99"},
      {name: "Rogan Josh", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$4.99"},
      {name: "Spicy Prok Vindaloo", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$9.99"},
    ];
  
    const starters = [
      {name: "Indian Onion", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$5.99"},
      {name: "Veg Kabab", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$6.99"},
      {name: "Paneer 65", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$4.99"},
    ];
  
    const pizza = [
      {name: "Chicago Pizza", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$5.99"},
      {name: "New York Piza", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$6.99"},
      {name: "Gree Pizza", info: "Food is any substance consumed to provide nutritional support for an organism. ", cost: "$4.99"},
    ];

    return (

      <ScrollView >

        <View style={styles.topNav}>
        <TextInput placeholder='Search' onChangeText={(search) => this.setState({search})} style={styles.searchBar}/>
        </View>

        <Text style={{fontSize: 30, fontWeight: 'bold', padding: 5, backgroundColor: '#f0f0f0', borderWidth: 0.175}}>Entrees</Text>
        <View>
          {this.filterList(entrees).map((listItem) => (
            <View key={listItem.name} >
              <Dish name={listItem.name} info={listItem.info} cost={listItem.cost}/>
            </View>
          ))}
        </View>

        <Text style={{fontSize: 30, fontWeight: 'bold', padding: 5, backgroundColor: '#f0f0f0', borderWidth: 0.175}}>Starters</Text>
        <View>
          {this.filterList(starters).map((listItem) => (
            <View key={listItem.name} >
              <Dish name={listItem.name} info={listItem.info} cost={listItem.cost}/>
            </View>
          ))}
        </View>

        <Text style={{fontSize: 30, fontWeight: 'bold', padding: 5, backgroundColor: '#f0f0f0', borderWidth: 0.175}}>Pizza</Text>
        <View>
          {this.filterList(pizza).map((listItem) => (
            <View key={listItem.name} >
              <Dish name={listItem.name} info={listItem.info} cost={listItem.cost}/>
            </View>
          ))}
        </View>

      </ScrollView>


    );
  }
}


export default Menu;