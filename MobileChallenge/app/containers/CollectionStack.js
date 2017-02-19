'use strict'

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import CollectionScreen from './CollectionScreen'
import GiftedCollectionScreen from './GiftedCollectionScreen'
import ImageScreen from './ImageScreen'

const CollectionStack = StackNavigator({
  Collection: {
    name: 'Collection Screen',
    description: 'Initial screen for viewing photos',
    screen: GiftedCollectionScreen,
    navigationOptions: {
      header: {
        title: 'Collections',
      }
    }
  },
  Image: {
    name: 'Full Image Screen',
    description: 'Scroll view for viewing full-size photos',
    screen: ImageScreen,
    navigationOptions: {
      header: {
        title: '',
        style: {
          borderColor: 'red',
          backgroundColor: 'black',
        }
      }
    }
  }


}, {
  headerMode: 'screen',
  initialRouteName: 'Collection',
})

export default CollectionStack
