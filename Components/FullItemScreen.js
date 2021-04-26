import React, {Component} from 'react';

import FullItem from './FullItem';
import {Modal} from 'react-native';

class FullItemScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    reviews: null,
    stars: null,
    desc: '',
    name: null,
    model: null,
  };

  componentDidMount() {
    fetch('http://159.203.3.150/api/reviews/' + this.props.dishId)
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          reviews: json.response,
          stars: json.stars,
          desc: json.desc,
          name: json.name,
          model: json.model,
        }),
      )
      .catch((err) => console.log(err));
  }

  render() {
    let i;
    const userComments = [];

    if (this.state.reviews) {
      this.state.reviews.map((review) => {
        userComments.push({
          name: review.user_full_name,
          comment: review.review_comment,
          date: review.review_date,
          star: review.review_rating,
        });
      });
    }

    let foodRating = 0;

    if (this.state.stars) {
      foodRating =
        this.state.stars.reduce((a, v, i) => (a = a + v * (i + 1)), 0) /
        this.state.stars.reduce((a, v) => (a = a + v), 0);
    }

    const stars = [0, 0, 0, 0, 0];

    for (i = 0; i < parseInt(foodRating); i++) {
      stars[i] = 1;
    }

    let timesRated = 0;

    if (this.state.reviews) {
      timesRated = this.state.reviews.length;
    }

    const ratingDistribution = [0, 0, 0, 0, 0];

    if (this.state.stars) {
      for (i = 0; i < 5; i++) {
        ratingDistribution[i] =
          this.state.stars[i] /
          this.state.stars.reduce((a, v) => (a = a + v), 0);
      }
    }

    return (
      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {
          this.props.close();
        }}>
        <FullItem
          name={this.state.name}
          stars={stars}
          rating={foodRating}
          timesRated={timesRated}
          ratingDist={ratingDistribution}
          userInfo={userComments}
          desc={this.state.desc}
          model={this.state.model}
          user={this.props.user}
          dishId={this.props.dishId}
        />
      </Modal>
    );
  }
}

export default FullItemScreen;
