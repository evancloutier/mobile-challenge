import React, { Component, PropTypes } from 'react'
import { View, Image, Text, Dimensions, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles/PhotoFooterStyle'

export default class IconFooter extends Component {
  constructor(props) {
    super(props)

    this._timestampToHours = this._timestampToHours.bind(this)
    this._viewIconPicker = this._viewIconPicker.bind(this)
    this._voteIconPicker = this._voteIconPicker.bind(this)
  }
  
  static propTypes = {
    avatar: PropTypes.string,
    photographer: PropTypes.string,
    created: PropTypes.string,
    views: PropTypes.number,
    votes: PropTypes.number,
  }

  render() {
    const photographerName = this.props.photographer.length > 20 ?
    this.props.photographer.substring(0, 15) + '...' : this.props.photographer

    return (
      <View style = { styles.container }>
        <View style = { styles.user }>
          <View style = { styles.avatar }>
            <Image style = { styles.image } source = {{ uri: this.props.avatar }}/>
          </View>
          <View style = { styles.avatarInfo }>
            <Text style = { styles.photographerText}>{ photographerName }</Text>
            <Text style = { styles.createdText }>{ this._timestampToHours(this.props.created) } hours ago</Text>
          </View>
        </View>
        <View style = { styles.social }>
          { this._viewIconPicker() }
          <Text style = { styles.socialText }>{ this.props.views }</Text>
          { this._voteIconPicker() }
          <Text style = { styles.socialText }>{ this.props.votes }</Text>
        </View>
      </View>
    )
  }

  _viewIconPicker() {
    if (Platform.OS == 'ios') {
      return (
        <Icon name = 'ios-eye-outline' color = '#fff' size = { 30 }/>
      )
    } else if (Platform.OS == 'android') {
      return (
        <Icon name = 'md-eye' color = '#fff' size = { 30 }/>
      )
    }
  }

  _voteIconPicker() {
    if (Platform.OS == 'ios') {
      return (
        <Icon name = 'ios-heart-outline' color = '#fff' size = { 25 }/>
      )
    } else if (Platform.OS == 'android') {
      return (
        <Icon name = 'md-heart' color = '#fff' size = { 25 }/>
      )
    }
  }

  _timestampToHours(timestamp) {
    let photoDate = Date.parse(timestamp)
    let instanceDate = Date.now()

    return Math.round(Math.abs(photoDate - instanceDate) / 36e5)
  }
}
