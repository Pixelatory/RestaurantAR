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

class ReviewFullScreen extends Component {
  state = {
    dishes: null,
    index: 0,
    reviewRating: 0,
  };

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
    const starImages = {
      full: require('../assets/fullStar.png'),
      empty: require('../assets/emptyStar.png'),
      fullOrange: require('../assets/fullStar-orange.png'),
    };
    return (
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
            style={{borderWidth: 1, borderRadius: 10, margin: 10}}
          />
          <TouchableOpacity
            style={[styles.notiButton, styles.submitButton]}
            color="#FF9933">
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
