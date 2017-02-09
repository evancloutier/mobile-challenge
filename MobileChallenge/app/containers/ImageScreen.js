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
      page: '',
      key: '',
      items: []
    }
  }

  componentWillMount() {
    this.setState({
      page: this.props.navigation.state.params.page,
      key: this.props.navigation.state.params.key,
      items: this.props.navigation.state.params.array
    })
  }

  render() {
    return (
      <Swiper
        showsButtons
        loop = { false }
        index = { this.state.key }
        onMomentumScrollEnd = { this._onMomentumScrollEnd.bind(this) }
        renderPagination = { this._renderPagination.bind(this) }
        renderNewItems = { this._renderNewItems.bind(this) }
        fetchNextPage = { this._fetchNextPage.bind(this) }>
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

  _renderNewItems(index, items) {
    let oldItems = this.state.items
    let newItems = oldItems.concat(items)
    this.setState({ items: newItems, key: index })
  }

  _renderPagination(index, total, context) {
    if (index >= (total - 3)) {
      this._fetchNextPage().then((data) => {
        const photos = data.photos

        let items = Array.apply(null, Array(photos.length)).map((v, i) => {
          return { id: i, photo: photos[i] }
        })

        return this._renderNewItems(index, items)
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

  _onMomentumScrollEnd(e, state, context) {
    const photoPage = Math.floor(state.index / 10) + 1
    const statePage = this.state.page.current
    console.log('Current page: ' + photoPage)
    console.log('State page: ' + statePage)


    if (photoPage !== statePage) {
      this._renderNewPage(photoPage)
    }
  }

  _renderNewPage(page) {
    let newPage = this.state.page
    newPage.current = page
    this.setState({ page: newPage })
  }
}

export default ImageScreen
