'use strict'

import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'

// Import styles
import styles from './styles/CollectionScreenStyle'

class ImageScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Scroll view goes here</Text>
      </View>
    )
  }
}

export default ImageScreen
