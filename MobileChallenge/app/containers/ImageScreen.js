'use strict'

import React, { Component } from 'react'
import { Text, View, Image, Button, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import NavigationBar from 'react-native-navbar'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles/ImageScreenStyle'

const { width, height } = Dimensions.get('window')
const COLLECTION_URL = 'https://api.500px.com/v1/photos?feature=popular&rpp=20&image_size=6'
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
    const items = this._transformPhotoArray(this.props.navigation.state.params.array)

    this.setState({
      page: this.props.navigation.state.params.page,
      key: this.props.navigation.state.params.key,
      items: items
    })
  }

  _transformPhotoArray(photos) {
    let items = []
    for (const row in photos) {
      items.push(photos[row][0])
      items.push(photos[row][1])
    }

    return items
  }

  render() {
    return (
      <Swiper
        loop = { false }
        index = { this.state.page == 1 ? this.state.key : (this.state.key) + ((this.state.page - 1) * 20) }
        onMomentumScrollEnd = { this._onMomentumScrollEnd.bind(this) }
        renderPagination = { this._renderPagination.bind(this) }
        renderNewItems = { this._renderNewItems.bind(this) }
        fetchNextPage = { this._fetchNextPage.bind(this) }>
        { this.state.items.map((item, key) => {

          const titleConfig = {
            title: item.photo.name.length > 25 ? item.photo.name.substring(0, 22) + '...' : item.photo.name,
            style: {
              color: '#fff',
              fontSize: 17,
              fontWeight: '500',
              letterSpacing: 0
            }
          }

          // Why are these buttons so sensitive!
          const leftButtonConfig = Platform.select({
            ios: (
              <TouchableOpacity
                style = { styles.navBarButton }
                hitSlop = {{ top: 100, left: 100, bottom: 100, right: 100 }}
                onPress = { () => console.log('Pressed') }>
                <Icon name = 'ios-arrow-back' size = { 25 } color = '#fff'/>
              </TouchableOpacity>
            ),
            android: (
              <TouchableOpacity
                style = { styles.navBarButton }
                hitSlop = {{ top: 100, left: 100, bottom: 100, right: 100 }}
                onPress = { () => console.log('Pressed') }>
                <Icon name = 'md-arrow-back' size = { 25 } color = '#fff'/>
              </TouchableOpacity>
            )
          })

          return (
            <View key = { key } style = { styles.slide }>
              <NavigationBar
                title = { titleConfig }
                leftButton = { leftButtonConfig }
                style = { styles.navBar }
                statusBar = {{ tintColor: 'black' }}
              />
              <Image
                style = { styles.image }
                resizeMode = 'contain'
                source = {{ uri: item.photo.image_url }}
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
    console.log(oldItems)
    console.log(newItems)

    this.setState({
      items: newItems,
      key: index
    })
  }

  _renderPagination(index, total, context) {
    if (index >= (total - 6)) {
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
      const currentPage = this.state.page
      const totalPages = 1000

      if ((currentPage + 1) < totalPages) {
        const PAGE_URL = '&page=' + (currentPage + 1)

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
    const photoPage = Math.floor(state.index / 20) + 1
    const statePage = this.state.page
    console.log('Current page: ' + photoPage)
    console.log('State page: ' + statePage)


    if (photoPage !== statePage) {
      this._renderNewPage(photoPage)
    }
  }

  _renderNewPage(page) {
    this.props.navigation.state.params.page = page
    this.setState({ page: page })
  }

}

export default ImageScreen
