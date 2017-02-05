'use strict'

import React, { Component } from 'react'
import { Image, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'

// Import styles and components
import PhotoGrid from '../components/PhotoGrid'
import styles from './styles/CollectionScreenStyle'

const COLLECTION_URL = 'https://api.500px.com/v1/photos?feature=popular&rpp=21&image_size=3&consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'


class CollectionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
  }

  static navigationOptions = {
    title: 'Collections'
  }

  componentDidMount() {
    this._fetchPhotoCollection().then((data) => {
      const photos = data.photos

      let items = Array.apply(null, Array(21)).map((v, i) => {
        return { id: i, photo: photos[i] }
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
        onPress = {(event) => this.navigation.navigate('Image', { id: item.photo.id })}
      >
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.photo.image_url }}
        />
      </TouchableOpacity>
    )
  }

  _fetchPhotoCollection() {
    return new Promise((resolve, reject) => {
      fetch(COLLECTION_URL)
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
