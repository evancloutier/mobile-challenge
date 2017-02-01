'use strict'

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

// Import screens here
import LoginScreen from './LoginScreen'
import CollectionStack from './CollectionStack'

const AppNavigator = StackNavigator({
  Login: {
    name: 'Login Screen',
    description: 'Initial log in screen',
    screen: LoginScreen
  },
  CollectionStack: {
    name: 'Collection Stack',
    description: 'StackNavigator for photo collection',
    screen: CollectionStack
  }
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
})

export default () => <AppNavigator />
