import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from '../StyleSheets/externalStyleSheet';

const Banner = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

export default Banner;