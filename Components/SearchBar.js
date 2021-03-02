import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

class SearchBar extends Component {
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
    
	const list = [
		{name: "Butter Chicken", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$5.99"},
		{name: "Palak Paneer", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$6.99"},
		{name: "Rogan Josh", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$4.99"},
		{name: "Spicy Prok Vindaloo", info: "dfdsf sdf sdf dsf dsf ddf dsf dsf dfd df dsjfdskjfd vjlv bj ksdjfklds fdsf ", cost: "$9.99"},
	];

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(search) => this.setState({search})}
          style={styles.searchBar}
        />
        {this.filterList(list).map((listItem, index) => (
            // console.log(listItem)
            <View>
               
            </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
  },
  searchBar: {
    fontSize: 18,
    margin: 10,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
  },
});

export default SearchBar;