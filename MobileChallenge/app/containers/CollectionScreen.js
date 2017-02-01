'use strict'

import React, { Component } from 'react'
import { Image, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'

// Import styles and components
import PhotoGrid from '../components/PhotoGrid'
import styles from './styles/CollectionScreenStyle'

// const url = 'https://api.500px.com/v1/photos?consumer_key=QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'


class CollectionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
  }

  static navigationOptions = {
    title: 'Collections'
  }

  componentDidMount() {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'https://unsplash.it/600/400/?image='+(i+1) }
    })
    this.setState({ items })
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
    console.log(this)

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
}

export default CollectionScreen
