import React, {Component} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Banner from './Components/Banner';
import Menu from './Components/Menu';
import FullItemScreen from './Components/FullItemScreen';

import styles from './StyleSheets/externalStyleSheet';


export default class App extends Component {
	state = {
      menuScreen: true,
	  fullItemId: null,
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
	
	render() {
	  return (
	    <View>
	    {this.state.fullItemId != null && <FullItemScreen dishId={this.state.fullItemId} close={() => {this.setState({fullItemId: null})}}/>}
		<View style={styles.main}>
			<Menu 
			open={this.state.menuScreen} 
			close={() => this.setState({menuScreen: false})} 
			dishes={this.state.dishes}
			categories={this.state.categories}
			fullItem={(num) => this.setState({fullItemId: num})}/>

			<Banner title="TAP DISH TO VIEW 3D MODEL"/>

		</View>
		</View>
	  )};
}
