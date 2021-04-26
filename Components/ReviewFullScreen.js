import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import auth from '@react-native-firebase/auth';

class ReviewFullScreen extends Component {
  state = {
    dishes: null,
    index: 0,
    reviewRating: 0,
    reviewComment: null,
  };

  constructor(props) {
    super(props);
    this.submitReview.bind(this);
    this.postReview.bind(this);
  }

  componentDidMount() {
    fetch('http://159.203.3.150/api/dishes/')
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          dishes: json.response,
        }),
      )
      .catch((err) => console.log(err));
  }

  postReview(idToken) {
    fetch('http://159.203.3.150/api/reviews', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        uid: idToken,
        user_full_name: auth().currentUser.displayName,
        dish_id: this.state.index,
        review_rating: this.state.reviewRating.toString(),
        review_comment: this.state.reviewComment,
      }),
    });
  }

  submitReview() {
    let wow = this;
    auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        wow.postReview(idToken);
      });
  }

  isModelYoutube() {
    if (this.state.dishes == null) {
      return false;
    } else if (
      this.state.dishes[this.state.index].dish_model.includes('www.youtube.com')
    ) {
      return true;
    }
  }

  getYouTubeId() {
    return this.state.dishes[this.state.index].dish_model.split('v=')[1];
  }

  render() {
    let starImages = {
      full: require('../assets/fullStar.png'),
      empty: require('../assets/emptyStar.png'),
      fullOrange: require('../assets/fullStar-orange.png'),
    };
    let closeImage = require('../assets/close.png');
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.close()}>
          <Image source={closeImage} style={{width: 20, height: 20, left: 5, top: 5}} />
        </TouchableOpacity>
        <ScrollView>
          <View style={{paddingBottom: 15}}>
            <Text style={styles.title}>
              {this.state.dishes != null
                ? this.state.dishes[this.state.index].dish_name
                : ''}
            </Text>
            <View style={{justifyContent: 'center', height: 250}}>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  left: 0,
                  zIndex: 3,
                }}
                onPress={() => {
                  this.setState((prevState) => {
                    return {
                      index:
                        prevState.index - 1 < 0
                          ? this.state.dishes.length - 1
                          : prevState.index - 1,
                    };
                  });
                }}>
                <Image
                  source={require('../assets/left-arrow.png')}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
              {this.isModelYoutube() && (
                <YoutubePlayer
                  height={200}
                  style={{flex: 1}}
                  videoId={this.getYouTubeId()}
                  on
                />
              )}
              <TouchableOpacity
                style={{width: 35, height: 35, position: 'absolute', right: 0}}
                onPress={() => {
                  this.setState((prevState) => {
                    return {
                      index: (prevState.index + 1) % prevState.dishes.length,
                    };
                  });
                }}>
                <Image
                  source={require('../assets/right-arrow.png')}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.ratingStars}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({reviewRating: 1});
                }}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    this.state.reviewRating >= 1
                      ? starImages.fullOrange
                      : starImages.empty
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({reviewRating: 2});
                }}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    this.state.reviewRating >= 2
                      ? starImages.fullOrange
                      : starImages.empty
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({reviewRating: 3});
                }}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    this.state.reviewRating >= 3
                      ? starImages.fullOrange
                      : starImages.empty
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({reviewRating: 4});
                }}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    this.state.reviewRating >= 4
                      ? starImages.fullOrange
                      : starImages.empty
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({reviewRating: 5});
                }}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    this.state.reviewRating == 5
                      ? starImages.fullOrange
                      : starImages.empty
                  }
                />
              </TouchableOpacity>
            </View>
            <TextInput
              maxLength={500}
              multiline={true}
              placeholder={'Leave a comment...'}
              onChangeText={(value) => {
                this.setState({reviewComment: value});
              }}
              style={{borderWidth: 1, borderRadius: 10, margin: 10}}
            />
            <TouchableOpacity
              style={[styles.notiButton, styles.submitButton]}
              color="#FF9933"
              onPress={() => {
                this.submitReview();
              }}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ReviewFullScreen;
const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    margin: 5,
    fontSize: 32,
    fontWeight: 'bold',
  },

  starImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

  ratingStars: {
    flexDirection: 'row',
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
});
