'use strict';

import React, {Component} from 'react';

import {
  Text,
  Dimensions,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default class CameraScanner extends Component {
  constructor(props) {
    super(props);

    let tmp = [];
    for (let i = 0; i < this.props.dishes.length; i++) {
      tmp.push(this.props.dishes[i].dish_id);
    }

    this.state = {
      dish_ids: tmp,
    };
  }

  onSuccess = (e) => {
    let tmp = [];
    for (let i = 0; i < this.props.dishes.length; i++) {
      tmp.push(this.props.dishes[i].dish_id);
    }

    console.log('test1 ' + parseInt(e.data));
    if (tmp.includes(parseInt(e.data))) {
      console.log('test2');
      this.props.setItemId(parseInt(e.data));
    } else {
      this.scanner.reactivate();
    }
  };

  render() {
    console.log(this.state.dish_ids);
    return (
      <QRCodeScanner
        ref={(node) => {
          this.scanner = node;
        }}
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        showMarker={true}
        cameraStyle={{height: Dimensions.get('window').height, zIndex: 0}}
        bottomContent={
          <Text
            style={{
              position: 'absolute',
              bottom: 0,
              zIndex: 5,
              padding: 15,
              fontSize: 16,
              backgroundColor: '#FFFFFF33',
              width: Dimensions.get('window').width,
              textAlign: 'center',
            }}>
            Swipe up for menu
          </Text>
        }
      />
    );
  }
}
