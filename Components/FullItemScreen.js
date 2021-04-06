import React, {Component} from 'react';

import FullItem from './FullItem'

class FullItemScreen extends Component {
	
  constructor(props) {
    super(props);
  }
  
  state = {
	reviews: null,
	stars: null,
	desc: "",
  };
  
  componentDidMount() {
    fetch('http://159.203.3.150/api/reviews/' + this.props.dishId)
	.then(res => res.json())
	.then(json => this.setState({reviews: json.response, stars: json.stars, desc: json.desc[0].dish_description}))
	.catch(err => console.log(err));
  }
  
  render() {
  console.log(this.state.reviews);
	  
  var userComments = [];
  var description = "";
  
  if(this.state.reviews) {
    this.state.reviews.map((review) => {
	 userComments.push({name: review.user_full_name,
	 comment: review.review_comment});
	});
  }
  
  var foodRating = 0;

  if(this.state.stars)
    foodRating = this.state.stars.reduce((a,v,i) =>  a = a + (v * (i + 1)), 0) / this.state.stars.reduce((a,v) =>  a = a + v, 0);
  
  const stars = [0,0,0,0,0];
  
  for(var i = 0; i<parseInt(foodRating); i++){
    stars[i] = 1;
  }

  var timesRated = 0;
  
  if(this.state.stars)
    timesRated = this.state.stars.reduce((a,v) =>  a = a + v, 0);

  const ratingDistribution = [0, 0, 0, 0, 0];
  
  if(this.state.stars) {
    for(var i = 0; i < 5; i++) {
      ratingDistribution[i] = this.state.stars[i] / this.state.stars.reduce((a,v) =>  a = a + v, 0);
    }
  }

  return (
    
    <FullItem 
		name="Cheeseburger"
    	stars={stars} 
		rating={foodRating}
		timesRated={timesRated}
		ratingDist={ratingDistribution}
		userInfo={userComments}
		desc={this.state.desc}
	/>
    
  )};
};


export default FullItemScreen;
