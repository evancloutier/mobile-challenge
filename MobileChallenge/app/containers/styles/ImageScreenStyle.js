'use strict'

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  slide: {
    backgroundColor: '#000',
  },
  navBar: {
    backgroundColor: '#000',
  },
  navBarButton: {
    left: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 32,
    width,
    height,
  },
})
