'use strict'

import React, { Component } from 'react'
import { Text, View, Image, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Swiper from 'react-native-swiper'

// Import styles
import styles from './styles/ImageScreenStyle'

// API call constants
const PHOTO_URL = 'https://api.500px.com/v1/photos/'
const CONSUMER_KEY = '?consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'

// Device constants
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


class ImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: this.props.navigation.state.params.page,
      key: this.props.navigation.state.params.key,
      items: this.props.navigation.state.params.array
    }
  }

  static navigationOptions = {
      title: '',
  }

  render() {
    return (
      <Swiper showsButtons loop = { false } index = { this.state.key }>
        { this.state.items.map((item, key) => {
          console.log(item)
          return (
            <View key = { key }>
              <Image
                style = {{ width: deviceWidth, height: deviceHeight }}
                resizeMode = "contain"
                source = {{ uri: item.photo.image_url }}
              />
            </View>
          )
        })}
      </Swiper>
    )
  }

  // render() {
  //   return (
  //     <View style = { styles.container }>
  //       <ViewPager
  //         count = { this.state.items.length }
  //         selectedIndex = { this.state.key }>
  //         { this.state.items.map((item) => {
  //           return (
  //             <View key = { item.id }>
  //               <Image
  //                 style = {{ width: deviceWidth, height: deviceHeight }}
  //                 resizeMode = "contain"
  //                 source = {{ uri: item.photo.image_url }}
  //               />
  //             </View>
  //           )
  //         })}
  //       </ViewPager>
  //     </View>
  //   )
  // }

  // Turn this into pagination
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
