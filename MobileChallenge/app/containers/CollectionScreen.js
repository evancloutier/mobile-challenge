'use strict'

import React, { Component } from 'react'
import { Dimensions, View, Image, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import GiftedListView from '../components/GiftedListView'
import styles from './styles/CollectionScreenStyle'

const COLLECTION_URL = 'https://api.500px.com/v1/photos?feature=popular&rpp=20&image_size=6&page='
const CONSUMER_KEY = '&consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'

export default class GiftedCollectionScreen extends Component {
  constructor(props) {
    super(props)
  }

  _onFetch(page = 1) {
    return new Promise((resolve, reject) => {
      fetch(COLLECTION_URL + page + CONSUMER_KEY)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const photos = data.photos

        let items = Array.apply(null, Array(photos.length)).map((v, i) => {
          return { id: i, photo: photos[i] }
        })

        return resolve(this.buildRows(items))
      })
      .catch((error) => {
        return resolve(null)
      })
    })
  }

  _buildRows(items) {
    return items.reduce((rows, item, idx) => {
      if (idx % 2 === 0 && idx > 0) rows.push([])
      rows[rows.length - 1].push(item)
      return rows
    }, [[]])
  }

  _renderRow(items) {
    const { width, height } = Dimensions.get('window')
    const photoDimensions = this.props.getPhotoSizing(items)

    return (
      <View style = { styles.row }>
        { items.map((item, i) => this.props.renderItem(item, i, photoDimensions, this._page, this._rows)) }
      </View>
    )
  }

  _renderItem(item, index, dimensions, page, rows) {
    const itemHeight = dimensions[index].height
    const itemWidth = dimensions[index].width

    return (
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemWidth, height: itemHeight }}
        onPress = { (event) => this.navigation.navigate('Image', { page: page, key: item.id, array: rows, name: item.photo.name,
                                                                   avatar: item.photo.user.avatars.small.https, photographer: item.photo.user.fullname,
                                                                   created: item.photo.created_at, views: item.photo.times_viewed, votes: item.photo.votes_count }) }
      >
        <Image
          style = { styles.photo }
          resizeMode = "contain"
          source = {{ uri: item.photo.image_url }}
        />
      </TouchableOpacity>
    )
  }

  _getPhotoSizing(photos) {
    const { width, height } = Dimensions.get('window')
    let largeAspect = null, smallAspect = null, largeIndex = null, smallIndex = null

    for (let i = 0; i < photos.length; i++) {
      const ratio = photos[i].photo.width / photos[i].photo.height

      if (ratio > largeAspect) {
        largeAspect = ratio
        largeIndex = i
      }
    }

    if (largeIndex == 0) {
      smallIndex = 1
    } else {
      smallIndex = 0
    }

    smallAspect = photos[smallIndex].photo.width / photos[smallIndex].photo.height

    // Get the width when our photos are equal heights
    const largeScaledWidth = Math.round(largeAspect * photos[smallIndex].photo.height)
    const totalWidthEqualHeight = largeScaledWidth + photos[smallIndex].photo.width

    // Now we find the ratios of the widths and scale them down to the device
    const largeWidth = Math.round((largeScaledWidth / totalWidthEqualHeight) * width)
    const smallWidth = Math.round((photos[smallIndex].photo.width / totalWidthEqualHeight) * width)
    const largeHeight = Math.round(largeWidth / largeAspect)
    const smallHeight = Math.round(smallWidth / smallAspect)

    let photoDimensions = {}
    photoDimensions[smallIndex] = { width: smallWidth, height: smallHeight }
    photoDimensions[largeIndex] = { width: largeWidth, height: largeHeight }

    return photoDimensions
  }

  render() {
    const navigate = this.props.navigation

    return (
      <View style = { styles.container }>
        <GiftedListView
          rowView = { this._renderRow }
          renderItem = { this._renderItem }
          getPhotoSizing = { this._getPhotoSizing }
          onFetch = { this._onFetch }
          buildRows = { this._buildRows }
          navigation = { navigate }
          firstLoader = { true }
          pagination = { true }
          refreshable = { true }
        />
      </View>
    )
  }
}
