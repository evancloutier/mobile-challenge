'use strict'

import React, { Component } from 'react'
import { Text, View, Image, Button, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'
import Orientation from 'react-native-orientation'
import PhotoFooter from '../components/PhotoFooter'
import styles from './styles/ImageScreenStyle'

const { width, height } = Dimensions.get('window')
const COLLECTION_URL = 'https://api.500px.com/v1/photos?feature=popular&rpp=20&image_size=6'
const CONSUMER_KEY = '&consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'

export default class ImageScreen extends Component {
  constructor(props) {
    super(props)

    const init = Orientation.getInitialOrientation()

    this.state = {
      page: '',
      key: '',
      items: []
    }

    this._updateOrientation = this._updateOrientation.bind(this)
    Orientation.addOrientationListener(this._updateOrientation.bind(this))
  }

  static navigationOptions = {
    header: (navigation, header) => ({
      title: navigation.state.params.name,
      titleStyle: {
        color: 'white',
      },
      style: {
        backgroundColor: 'black',
      },
      ...Platform.select({
        ios: {
          left: (
            <TouchableOpacity onPress = { () => navigation.goBack() }>
              <Icon name = 'ios-arrow-back' color = '#fff' size = { 25 } style = {{ paddingLeft: 15 }}/>
            </TouchableOpacity>
          ),
        },
        android: {
          left: (
            <TouchableOpacity onPress = { () => navigation.goBack() }>
              <Icon name = 'md-arrow-back' color = '#fff' size = { 25 } style = {{ paddingLeft: 15 }}/>
            </TouchableOpacity>
          ),
        }
      })
    })
  }

  componentWillMount() {
    const items = this._transformPhotoArray(this.props.navigation.state.params.array)

    this.setState({
      page: this.props.navigation.state.params.page,
      key: this.props.navigation.state.params.key,
      items: items
    })
  }

  _updateOrientation(or) {

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
    const navigationParams = this.props.navigation.state.params

    return (
      <View style = { styles.container }>
        <View style = { styles.swiperContainer }>
          <Swiper
            loop = { false }
            height = { height * 0.78 }
            index = { this.state.page == 1 ? this.state.key : (this.state.key) + ((this.state.page - 1) * 20) }
            onMomentumScrollEnd = { this._onMomentumScrollEnd.bind(this) }
            renderPagination = { this._renderPagination.bind(this) }
            renderNewItems = { this._renderNewItems.bind(this) }
            fetchNextPage = { this._fetchNextPage.bind(this) }>
            { this.state.items.map((item, key) => {
              console.log(item)
              return (
                <View key = { key } style = { styles.imageContainer }>
                  <Image resizeMode = 'contain' style = { styles.image } source = {{ uri: item.photo.image_url }}/>
                </View>
              )
            })}
          </Swiper>
        </View>
        <PhotoFooter
          avatar = { navigationParams.avatar }
          photographer = { navigationParams.photographer }
          created = { navigationParams.created }
          views = { navigationParams.views }
          votes = { navigationParams.votes }
          >
        </PhotoFooter>
      </View>

    )
  }

  // <View style = { styles.footer }>
  //   <Text style = {{ color: '#fff', fontWeight: '500' }}>This is some centred text</Text>
  // </View>

  _renderNewItems(index, items) {
    let oldItems = this.state.items
    let newItems = oldItems.concat(items)

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

    const { setParams } = this.props.navigation
    const currentPhoto = this.state.items[state.index]

    setParams({
      name: currentPhoto.photo.name,
      avatar: currentPhoto.photo.user.avatars.small.https,
      photographer: currentPhoto.photo.user.fullname,
      created: currentPhoto.photo.created_at,
      views: currentPhoto.photo.times_viewed,
      votes: currentPhoto.photo.votes_count,
    })

    if (photoPage !== statePage) {
      this._renderNewPage(photoPage)
    }
  }

  _renderNewPage(page) {
    this.props.navigation.state.params.page = page
    this.setState({ page: page })
  }

}
