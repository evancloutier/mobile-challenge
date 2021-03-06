'use strict'

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import CollectionScreen from './CollectionScreen'
import ImageScreen from './ImageScreen'

const AppNavigator = StackNavigator({
  Collection: {
    name: 'Collection Screen',
    description: 'Initial screen for viewing photos',
    screen: CollectionScreen,
    navigationOptions: {
      header: {
        title: 'Popular on 500px',
        titleStyle: {
          color: 'white',
        },
        style: {
          backgroundColor: '#2B88DA'
        }
      }
    }
  },
  Image: {
    name: 'Full Image Screen',
    description: 'Scroll view for viewing full-size photos',
    screen: ImageScreen,
  }


}, {
  headerMode: 'screen',
  initialRouteName: 'Collection',
})

export default () => <AppNavigator />
