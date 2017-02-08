'use strict'

import React, { Component } from 'react'
import { Text, View, Image, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Swiper from 'react-native-swiper'
import styles from './styles/ImageScreenStyle'

const { width, height } = Dimensions.get('window')

const COLLECTION_URL = 'https://api.500px.com/v1/photos?feature=popular&rpp=10&image_size=3,6'
const CONSUMER_KEY = '&consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'


class ImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: this.props.navigation.state.params.page,
      key: this.props.navigation.state.params.key,
      items: this.props.navigation.state.params.array,
    }
    this._fetchNextPage = this._fetchNextPage.bind(this)
  }

  // Update the parent state to push in new items
  _renderNewItems(index, items) {
    let oldItems = this.state.items
    let newItems = oldItems.concat(items)
    this.setState({ items: newItems, key: index })
  }

  _renderNewPage(page) {
    this.setState({ page: page })
  }

  render() {
    return (
      <Swiper
        showsButtons
        loop = { false }
        index = { this.state.key }
        renderPagination = { this._renderPagination }
        renderNewItems = { this._renderNewItems.bind(this) }
        renderNewPage = { this._renderNewPage.bind(this) }
        fetchNextPage = { this._fetchNextPage }
        page = { this.state.page }>
        { this.state.items.map((item, key) => {
          return (
            <View key = { key } style = { styles.slide }>
              <Image
                style = {{ width, height }}
                resizeMode = 'contain'
                source = {{ uri: item.photo.images[1].url }}
              />
            </View>
          )
        })}
      </Swiper>
    )
  }

  _renderPagination(index, total, context) {
    let currentPage = Math.ceil((index / total))
    if (index == 0) currentPage = 1

    console.log('Index: ' + index)
    console.log('Total: ' + total)
    console.log('Current page: ' + currentPage)

    // Add more photos when index is the second last item
    if (index >= (total - 3)) {
      this.fetchNextPage().then((data) => {
        // Here is where we will update the state
        const photos = data.photos

        let items = Array.apply(null, Array(photos.length)).map((v, i) => {
          return { id: i, photo: photos[i] }
        })

        // Pass in the index because we want to retain our location
        this.renderNewItems(index, items)
      })
    }
  }

  _fetchNextPage() {
    return new Promise((resolve, reject) => {
      const currentPage = this.state.page.current
      const nextPage = currentPage + 1
      const totalPages = this.state.page.total

      if (nextPage < totalPages) {
        const PAGE_URL = '&page=' + nextPage

        fetch(COLLECTION_URL + PAGE_URL + CONSUMER_KEY)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          return resolve(data)
        })
        .catch((error) => {
          return reject(error)
        })
      }
    })
  }
}

export default ImageScreen
