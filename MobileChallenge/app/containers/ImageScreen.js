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
    this.state = { page: null, key: null, items: [] }
  }

  static navigationOptions = {
      title: '',
  }

  componentDidMount() {
    const page = this.props.navigation.state.params.page
    const key = this.props.navigation.state.params.key
    const items = this.props.navigation.state.params.array

    this.setState({ page, key, items })
  }

  render() {
    console.log(this)
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height

    return (
      <View style = { styles.display }>
        <Text>Load gallery here</Text>
      </View>
    )
  }

  // Turn this into pagination function based on page number?
  // _fetchPhotoData() {
  //   return new Promise((resolve, reject) => {
  //     const { params } = this.props.navigation.state
  //     console.log(params)
  //
  //     fetch(PHOTO_URL + params.array[] + CONSUMER_KEY)
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       return resolve(data.photo)
  //     })
  //     .catch((error) => {
  //       return reject(error)
  //     })
  //   })
  // }
}

export default ImageScreen
