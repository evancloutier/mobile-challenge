'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    flex: 4,
    flexDirection: 'row',
    paddingLeft: 15,
  },
  avatar: {
    height: 40,
    width: 40,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  avatarInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  social: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  photographerText: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    fontSize: 14,
  },
  createdText: {
    color: '#9e9e9e',
    fontWeight: '600',
    paddingLeft: 5,
    fontSize: 12,
  },
  socialText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    paddingLeft: 4,
    paddingRight: 8,
  },
})
