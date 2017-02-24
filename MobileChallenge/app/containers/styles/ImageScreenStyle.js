'use strict'

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  swiperContainer: {
    flex: 7,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
  // slide: {
  //   backgroundColor: '#000',
  // },
  // image: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   bottom: 32,
  //   width,
  //   height,
  // },
})
