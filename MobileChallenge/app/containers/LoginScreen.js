import React, { Component } from 'react'
import { Alert, View, WebView, StatusBar, Text, Keyboard, Button, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'

// import
import styles from './styles/LoginScreenStyle'

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login Screen'
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
      }}>
          <Button
            onPress={(event) => navigate('CollectionStack', { user: 'Evan' })}
            title="Sign In"
          />
      </View>
    )
  }
}

export default LoginScreen
