import React from 'react';

import FullItem from './FullItem'

const FullItemScreen = () => {

  var foodRating = 4
  const stars = [0,0,0,0,0]
  
  for(var i = 0; i<foodRating; i++){
    stars[i] = 1
  }

  var timesRated = 143

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
		timesRated={timesRated}
		userInfo = {userComments}
	/>
    
  );
};


export default FullItemScreen;
