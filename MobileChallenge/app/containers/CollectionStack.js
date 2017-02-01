'use strict'

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import CollectionScreen from './CollectionScreen'
import ImageScreen from './ImageScreen'

const CollectionStack = StackNavigator({
  Collection: {
    name: 'Collection Screen',
    description: 'Initial screen for viewing photos',
    screen: CollectionScreen
  },
  Image: {
    name: 'Full Image Screen',
    description: 'Scroll view for viewing full-size photos',
    screen: ImageScreen
  }


}, {
  initialRouteName: 'Collection'
})

export default CollectionStack