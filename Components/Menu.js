import React, {Component, Fragment} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView} from 'react-native';

import Dish from './Dish'

import styles from '../StyleSheets/externalStyleSheet';

class Menu extends Component {
  state = {
    search: '',
	dishes: null,
	categories: null,
  };
  
  // Fetch the dish and categories data from DB; set JSON response to state
  componentDidMount() {
    fetch('http://159.203.3.150/api/dishes')
	.then(res => res.json())
	.then(json => this.setState({dishes: json.response}))
	.catch(err => console.log(err));
	
	fetch('http://159.203.3.150/api/categories')
	.then(res => res.json())
	.then(json => this.setState({categories: json.response}))
	.catch(err => console.log(err));
  }

  filterList(list) {
    return list.filter(
      (listItem) =>
        listItem['dish_name']
        .toLowerCase()
        .includes(this.state.search.toLowerCase()) ||
        listItem['dish_name'].toLowerCase().includes(this.state.search.toLowerCase()),
    );
  }
  
  filterDishesOnCategory(dishes, categoryId) {
    return dishes.filter((item) => {
	  return item['dish_category'] == categoryId;
	})
  }
  
  render() {		
    return (
      <ScrollView>

        <View style={styles.topNav}>
        <TextInput placeholder='Search' onChangeText={(search) => this.setState({search})} style={styles.searchBar}/>
        </View>
		
		{this.state.categories && this.state.dishes && this.state.categories.map((item) => (
		  <Fragment>
		    <Text style={{fontSize: 30, fontWeight: 'bold', padding: 5, backgroundColor: '#f0f0f0', borderWidth: 0.175}}>{item['dish_categories_name']}</Text>
		    {this.filterDishesOnCategory(this.filterList(this.state.dishes), item['dish_categories_id']).map((listItem) => (
		      <View key={listItem['dish_name']}>
			    <Dish name={listItem['dish_name']} info={listItem['dish_description']} cost={listItem['dish_price']}/>
		      </View>
		    ))}
		  </Fragment>
	    ))}

      </ScrollView>


    );
  }
}


export default Menu;