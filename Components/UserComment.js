import React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';

const UserComment = (props) => {
  const starImages = {
    full: require('../assets/fullStar.png'),
    empty: require('../assets/emptyStar.png'),
  };

  const stars = [0, 0, 0, 0, 0];

  for (let i = 0; i < parseInt(props.rating); i++) {
    stars[i] = 1;
  }

  return (
    <View style={[styles.container, props.index % 2 ? styles.dark : null]}>
      <View style={styles.top}>
        <Image
          style={styles.avatarIcon}
          source={require('../assets/man.png')}
        />
        <Text style={styles.user}>{props.name}</Text>

        <View style={styles.ratingStars}>
          <Image
            style={styles.starImageStyle}
            source={stars[0] ? starImages.full : starImages.empty}
          />
          <Image
            style={styles.starImageStyle}
            source={stars[1] ? starImages.full : starImages.empty}
          />
          <Image
            style={styles.starImageStyle}
            source={stars[2] ? starImages.full : starImages.empty}
          />
          <Image
            style={styles.starImageStyle}
            source={stars[3] ? starImages.full : starImages.empty}
          />
          <Image
            style={styles.starImageStyle}
            source={stars[4] ? starImages.full : starImages.empty}
          />
        </View>

        <Text style={styles.date}>{props.date}</Text>
      </View>

      <View>
        <Text style={styles.comment}>{props.comment}</Text>
      </View>
    </View>
  );
};

export default UserComment;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },

  dark: {
    backgroundColor: '#F0F0F0',
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  avatarIcon: {
    width: 30,
    height: 30,
  },

  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },

  starImageStyle: {
    width: 12,
    height: 12,
    resizeMode: 'cover',
  },

  user: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  date: {
    fontStyle: 'italic',
  },

  comment: {
    fontSize: 14,
  },
});
