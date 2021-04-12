import React, {Component, Fragment} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView, TouchableHighlight, Modal} from 'react-native';

import Dish from './Dish';

import styles from '../StyleSheets/externalStyleSheet';

class Menu extends Component {
  state = {
    search: '',
  };

  // Filter dishes based on the search bar entry
  filterList(list) {
    return list.filter(
      (listItem) =>
        listItem['dish_name']
        .toLowerCase()
        .includes(this.state.search.toLowerCase()) ||
        listItem['dish_name'].toLowerCase().includes(this.state.search.toLowerCase()),
    );
  }
  
  // Filter dishes based on the category id given
  filterDishesOnCategory(dishes, categoryId) {
    return dishes.filter((item) => {
	  return item['dish_category'] == categoryId;
	})
  }
  
  render() {		
    return (
	  <Modal 
	  visible={this.props.open}>
        <ScrollView>

          <View style={styles.topNav}>
          <TextInput placeholder='Search' onChangeText={(search) => this.setState({search})} style={styles.searchBar}/>
          </View>
		
		  {this.props.categories && this.props.dishes && this.props.categories.map((item) => (
		    <Fragment key={item['dish_categories_id']}>
		      <Text style={styles.categoryText}>{item['dish_categories_name']}</Text>
		      {this.filterDishesOnCategory(this.filterList(this.props.dishes), item['dish_categories_id']).map((listItem) => (
			    <TouchableHighlight 
				activeOpacity={0.9} 
				underlayColor="#F09133" 
				onPress={() => {this.props.fullItem(listItem['dish_id'])}}
				key={listItem['dish_name']}>
			      <Dish name={listItem['dish_name']} info={listItem['dish_description']} cost={listItem['dish_price']}/>
			    </TouchableHighlight>
		      ))}
		    </Fragment>
	      ))}
		  
        </ScrollView>
	  </Modal>


    );
  }
}


export default Menu;