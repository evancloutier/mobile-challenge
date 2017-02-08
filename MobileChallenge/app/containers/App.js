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
    screen: LoginScreen,
    navigationOptions: {
      header: {
        visible: false,
      }
    }
  },
  CollectionStack: {
    name: 'Collection Stack',
    description: 'StackNavigator for photo collection',
    screen: CollectionStack,
    navigationOptions: {
      header: {
        visible: false
      }
    }
  }
}, {
  headerMode: 'screen',
  initialRouteName: 'Login',
})

export default () => <AppNavigator />
