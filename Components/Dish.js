import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import styles from '../StyleSheets/externalStyleSheet';

const Dish = (dish) => {
  return (
    <View style={styles.dishContainer}>
      <View style={styles.dishNameLogo}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Image
          source={require('../assets/food-plate.png')}
          style={styles.tapLogo}
        />
      </View>

      <Text numberOfLines={2} style={styles.dishInfo}>
        {dish.info}
      </Text>
    </View>
  );
};

export default Dish;
