import React, {useState} from 'react';

import {SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity,
} from 'react-native';

const UserCommentRating = () => {

  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setDefaultRating(item)
              }}
              >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>

        <CustomRatingBar />
       
        <Text style={styles.textStyle}>
          {defaultRating}
        </Text>


      </View>
    </SafeAreaView>
  );
};

export default UserCommentRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },

  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  textStyle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    // marginTop: 15,
  },

  textStyleSmall: {
    textAlign: 'center',
    fontSize: 8,
    color: '#000',
    // marginTop: 15,
  },

  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },

  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  starImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

});