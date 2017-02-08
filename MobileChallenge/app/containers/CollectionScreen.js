'use strict'

import React, { Component } from 'react'
import { Image, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import PhotoGrid from '../components/PhotoGrid'
import styles from './styles/CollectionScreenStyle'

const COLLECTION_URL = 'https://api.500px.com/v1/photos?feature=popular&rpp=10&image_size=3,6'
const CONSUMER_KEY = '&consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'


class CollectionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { page: null, items: [] }
  }

  componentDidMount() {
    this._fetchPhotoCollection().then((data) => {
      const page = {
        current: data.current_page,
        total: data.total_pages
      }
      const photos = data.photos

      let items = Array.apply(null, Array(photos.length)).map((v, i) => {
        return { id: i, photo: photos[i] }
      })

      this.setState({ page, items })
    })
  }

  render() {
    const navigate = this.props.navigation

    return (
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 2 }
        itemMargin = { 1 }
        renderHeader = { this._renderHeader }
        renderItem = { this._renderItem }
        navigation = { navigate }
        page = { this.state.page }
      />
    )
  }

  // TO-DO: Render items according to aspect ratio within grid
  _renderItem(item, itemSize) {
    return (
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = {(event) => this.navigation.navigate('Image', { page: this.page, key: item.id, array: this.data })}
      >
        <Image
          style = {{ flex: 1 }}
          resizeMode = "contain"
          source = {{ uri: item.photo.image_url }}
        />
      </TouchableOpacity>
    )
  }

  _fetchPhotoCollection() {
    return new Promise((resolve, reject) => {
      fetch(COLLECTION_URL + CONSUMER_KEY)
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
