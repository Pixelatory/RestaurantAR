import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const FullItemReview = (props) => {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState();

  const starImages = {
    full: require('../assets/fullStar.png'),
    empty: require('../assets/emptyStar.png'),
    fullOrange: require('../assets/fullStar-orange.png'),
  };

  function submitReview() {
    auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        fetch('http://159.203.3.150/api/reviews', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            uid: idToken,
            user_full_name: auth().currentUser.displayName,
            dish_id: props.dishId,
            review_rating: reviewRating.toString(),
            review_comment: reviewComment,
          }),
        });
      });
  }

  return (
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
              reviewRating >= 5 ? starImages.fullOrange : starImages.empty
            }
          />
        </TouchableOpacity>
      </View>
      <TextInput
        maxLength={500}
        multiline={true}
        style={{borderWidth: 1, borderRadius: 10, margin: 10}}
        onChangeText={(value) => setReviewComment(value)}
        value={reviewComment}
      />
      <TouchableOpacity
        style={[styles.notiButton, styles.submitButton]}
        color="#FF9933"
        onPress={() => submitReview()}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FullItemReview;

const styles = StyleSheet.create({
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  starImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
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
});
