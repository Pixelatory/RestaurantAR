import React from 'react';

import FullItem from './FullItem'

const FullItemScreen = () => {

  var foodRating = 3.3
  const stars = [0,0,0,0,0]
  
  for(var i = 0; i<parseInt(foodRating); i++){
    stars[i] = 1
  }

  var timesRated = 1433

  const ratingDistribution = [0.65, 0.10, 0.5, 0.5, 0.15]

  const userComments = [
		{name: "Paramvir", comment:"It is made with basmati rice, spices and goat meat. Popular variations use chicken instead of goat meat. There are various forms of Hyderabadi biryani. ", date: (new Date()).toDateString()},
		{name: "Fahad", comment:"It is made with basmati rice, spices and goat meat. Popular variations use chicken instead of goat meat. There are various forms of Hyderabadi biryani. ", date: (new Date()).toDateString()},
		{name: "Tyger", comment:"It is made with basmati rice, spices and goat meat. Popular variations use chicken instead of goat meat. There are various forms of Hyderabadi biryani. ", date: (new Date()).toDateString()},
		{name: "Nick", comment:"It is made with basmati rice, spices and goat meat. Popular variations use chicken instead of goat meat. There are various forms of Hyderabadi biryani. ", date: (new Date()).toDateString()},
		{name: "Michael", comment:"It is made with basmati rice, spices and goat meat. Popular variations use chicken instead of goat meat. There are various forms of Hyderabadi biryani. ", date: (new Date()).toDateString()},
		{name: "Jello", comment:"It is made with basmati rice, spices and goat meat. Popular variations use chicken instead of goat meat. There are various forms of Hyderabadi biryani. ", date: (new Date()).toDateString()},
		{name: "KJ", comment:"It is made with basmati rice, spices and goat meat. Popular variations use chicken instead of goat meat. There are various forms of Hyderabadi biryani. ", date: (new Date()).toDateString()},
	]

  return (
    
    <FullItem 
		name="Cheeseburger"
    	stars={stars} 
		rating={foodRating}
		timesRated={timesRated}
		ratingDist={ratingDistribution}
		userInfo = {userComments}
	/>
    
  );
};


export default FullItemScreen;
