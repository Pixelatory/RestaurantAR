import React, {useState} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {ProgressBar, Colors} from 'react-native-paper';

import UserComment from './UserComment';
import YoutubePlayer from 'react-native-youtube-iframe';
import PushNotification from 'react-native-push-notification';

const FullItem = (props) => {
  const [displayScroll, setDisplayScroll] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);

  const starImages = {
    full: require('../assets/fullStar.png'),
    empty: require('../assets/emptyStar.png'),
    fullOrange: require('../assets/fullStar-orange.png'),
  };

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  function isModelYoutube() {
    if (props.model == null) {
      return false;
    } else if (props.model.includes('www.youtube.com')) {
      return true;
    }
  }

  function makeNotification() {
    PushNotification.localNotificationSchedule({
      channelId: 'channel-id',
      message: 'Hey, would you like to leave a review for us?', // (required)
      date: new Date(Date.now() + 1),
      id: 521,
    });
    const setReviewTime = async () => {
      try {
        const jsonValue = JSON.stringify(Date.now() + 1);
        await AsyncStorage.setItem('reviewTime', jsonValue);
      } catch (e) {
        throw e;
      }
    };

    setReviewTime();
  }

  function getYouTubeId() {
    return props.model.split('v=')[1];
  }

  return (
    <View style={styles.container}>
      {displayScroll && (
        <View
          style={{
            position: 'absolute',
            padding: 15,
            width: '100%',
            flex: 1,
            bottom: 0,
            zIndex: 9000,
            backgroundColor: 'white',
            justifyContent: 'center',
            borderTopWidth: 2,
          }}>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>
            Scroll Down
          </Text>
        </View>
      )}
      <ScrollView
        style={styles.scrollview}
        onScroll={(e) => setDisplayScroll(false)}
        onContentSizeChange={(w, h) =>
          h > Dimensions.get('window').height
            ? setDisplayScroll(true)
            : setDisplayScroll(false)
        }>
        <View>
          <Text style={styles.title}>{props.name}</Text>
        </View>
        {isModelYoutube() && (
          <YoutubePlayer
            height={200}
            style={{flex: 1}}
            videoId={getYouTubeId()}
          />
        )}
        <View style={styles.ratingContainer}>
          <View>
            <Text style={styles.ratingNum}>
              {isNaN(props.rating) ? 'No Reviews' : props.rating}
            </Text>
            <View style={styles.ratingStars}>
              <Image
                style={styles.starImageStyle}
                source={props.stars[0] ? starImages.full : starImages.empty}
              />
              <Image
                style={styles.starImageStyle}
                source={props.stars[1] ? starImages.full : starImages.empty}
              />
              <Image
                style={styles.starImageStyle}
                source={props.stars[2] ? starImages.full : starImages.empty}
              />
              <Image
                style={styles.starImageStyle}
                source={props.stars[3] ? starImages.full : starImages.empty}
              />
              <Image
                style={styles.starImageStyle}
                source={props.stars[4] ? starImages.full : starImages.empty}
              />
            </View>
            <Text style={{textAlign: 'center'}}>
              {formatNumber(props.timesRated) == 0
                ? 'Go leave one :)'
                : formatNumber(props.timesRated)}
            </Text>
          </View>

          <View style={styles.expandedRating}>
            <ProgressBar
              progress={props.ratingDist[0]}
              color={Colors.deepOrangeA100}
            />
            <ProgressBar
              progress={props.ratingDist[1]}
              color={Colors.deepOrangeA100}
            />
            <ProgressBar
              progress={props.ratingDist[2]}
              color={Colors.deepOrangeA100}
            />
            <ProgressBar
              progress={props.ratingDist[3]}
              color={Colors.deepOrangeA100}
            />
            <ProgressBar
              progress={props.ratingDist[4]}
              color={Colors.deepOrangeA100}
            />
          </View>
        </View>
        <View style={styles.desc}>
          <Text>{props.desc}</Text>
        </View>

        <View style={styles.notification}>
          <TouchableOpacity
            style={styles.notiButton}
            color="#FF9933"
            onPress={makeNotification}>
            <Text style={styles.buttonText}>Ask me later to review</Text>
          </TouchableOpacity>
        </View>

        <View>
          {props.userInfo.map((listItem, index) => (
            <View key={listItem.name}>
              <UserComment
                name={listItem.name}
                comment={listItem.comment}
                date={listItem.date}
                rating={listItem.star}
                index={index}
              />
            </View>
          ))}
        </View>
        <View style={{margin: 5}}>
          <Text
            style={{
              margin: 10,
              marginBottom: 5,
              marginLeft: 15,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Leave a Review
          </Text>
          <View style={styles.ratingStars}>
            <TouchableOpacity
              onPress={() => {
                setReviewRating(1);
              }}>
              <Image
                style={styles.starImageStyle}
                source={
                  reviewRating >= 1 ? starImages.fullOrange : starImages.empty
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setReviewRating(2);
              }}>
              <Image
                style={styles.starImageStyle}
                source={
                  reviewRating >= 2 ? starImages.fullOrange : starImages.empty
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setReviewRating(3);
              }}>
              <Image
                style={styles.starImageStyle}
                source={
                  reviewRating >= 3 ? starImages.fullOrange : starImages.empty
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setReviewRating(4);
              }}>
              <Image
                style={styles.starImageStyle}
                source={
                  reviewRating >= 4 ? starImages.fullOrange : starImages.empty
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setReviewRating(5);
              }}>
              <Image
                style={styles.starImageStyle}
                source={
                  reviewRating == 5 ? starImages.fullOrange : starImages.empty
                }
              />
            </TouchableOpacity>
          </View>
          <TextInput
            maxLength={500}
            multiline={true}
            style={{borderWidth: 1, borderRadius: 10, margin: 10}}
          />
          <TouchableOpacity
            style={[styles.notiButton, styles.submitButton]}
            color="#FF9933">
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default FullItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexGrow: 2,
  },

  title: {
    alignSelf: 'center',
    margin: 5,
    fontSize: 32,
    fontWeight: 'bold',
  },

  scrollview: {
    flex: 1,
  },

  ratingContainer: {
    flexDirection: 'row',
    padding: 10,
  },

  ratingNumStars: {
    alignContent: 'center',
  },

  ratingNum: {
    fontSize: 36,
    textAlign: 'center',
    color: '#FF9933',
    fontWeight: 'bold',
  },

  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },

  expandedRating: {
    flex: 1,
    padding: 5,
    justifyContent: 'space-evenly',
  },

  starImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

  desc: {
    alignItems: 'center',
    padding: 10,
  },

  notification: {
    flex: 0.2,
    justifyContent: 'space-evenly',
    padding: 10,
  },

  notiButton: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#FF9933',
    alignItems: 'center',
  },

  submitButton: {
    alignSelf: 'center',
    width: '75%',
    minWidth: 75,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  comments: {
    flex: 1.5,
  },
});
