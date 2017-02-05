'use strict'

import React, { Component } from 'react'
import { View, Image, Dimensions, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'

// Import styles
import styles from './styles/ImageScreenStyle'

const PHOTO_URL = 'https://api.500px.com/v1/photos/'
const CONSUMER_KEY = '?consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'

class ImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { photo: {} }
  }

  static navigationOptions = {
      title: '',
  }

  componentDidMount() {
    this._fetchPhotoData().then((photo) => {
      console.log(photo)
      this.setState({ photo })
    })
  }

  render() {
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height

    return (
      <View style={ styles.display }>
        <Image
          style = {{ width: deviceWidth, height: deviceHeight }}
          resizeMode = "contain"
          source = {{ uri: this.state.photo.image_url }}
        />
      </View>
    )
  }

  _fetchPhotoData() {
    return new Promise((resolve, reject) => {
      const { params } = this.props.navigation.state

      fetch(PHOTO_URL + params.id + CONSUMER_KEY)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return resolve(data.photo)
      })
      .catch((error) => {
        return reject(error)
      })
    })
  }
}

export default ImageScreen
