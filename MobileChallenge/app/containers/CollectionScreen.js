'use strict'

import React, { Component } from 'react'
import { Image, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'

// Import styles and components
import PhotoGrid from '../components/PhotoGrid'
import styles from './styles/CollectionScreenStyle'




class CollectionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
  }

  static navigationOptions = {
    title: 'Collections'
  }

  componentDidMount() {
    this._fetchPhotoData().then((data) => {
      console.log(data)
      const photos = data.photos

      let items = Array.apply(null, Array(20)).map((v, i) => {
        return { id: i, src: photos[i].image_url }
      })

      this.setState({ items })
    })
  }

  render() {
    const navigate = this.props.navigation

    return (
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { this._renderHeader }
        renderItem = { this._renderItem }
        navigation = { navigate }
      />
    )
  }

  _renderItem(item, itemSize) {
    return (
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress={(event) => this.navigation.navigate('Image', { photo: item.src })}
      >
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }

  _fetchPhotoData() {
    return new Promise((resolve, reject) => {
      fetch('https://api.500px.com/v1/photos?consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return resolve(data)
      })
      .catch((error) => {
        return reject(error)
      })
    })
  }
}

export default CollectionScreen
