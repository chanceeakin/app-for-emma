import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {LinearGradient} from 'expo'


import {
  updateUserNameText,
  updatePasswordText
} from './../actions/login'

import {
  mainPage,
  signupPage
} from './../actions/navigation'

const mapStateToProps = state => ({
  userName: state.login.username,
  password: state.login.password,
  isFontLoaded: state.app.isFontLoaded
})

const mapDispatchToProps = {
  updateUserNameText,
  updatePasswordText,
  mainPage,
  signupPage
}



var styles = StyleSheet.create({
  container:{
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  row:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title:{
    fontSize: 48,
    fontWeight: '600',
    marginBottom: 30,
    color: '#C5CC08'
  },
  font: {
    'fontFamily': 'Skia'
  },
  description:{
    marginTop: 5,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: '#fafafa',
    minWidth: 200
  },
  bigButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: 'purple',
    borderRadius: 5
  },
  bigButtonText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#C5CC08'
  },
  signupButton: {
    padding: 5
  },
  text: {
    color: '#C5CC08'
  }
})


class LoginView extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {userName, password} = this.props
    return (
      <LinearGradient
        colors={['#041069', '#69044E']}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.25, 0.4, 1]}
        style={styles.container}
      >
        <View style={styles.row}>
          <Text style={[styles.title,(this.props.isFontLoaded ? styles.font : null)]
          }>Login</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.updateUserNameText(text)}
            value={userName}
            placeholder="User Name"
            placeholderTextColor={'rgba(255,255,255,0.3)'}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.updatePasswordText(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={'rgba(255,255,255,0.3)'}
          />
          <TouchableOpacity
            style={styles.bigButton}
            onPress={this.props.mainPage}
          >
            <Text style={styles.bigButtonText}>
              Login
            </Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity
          onPress={this.props.signupPage}
          style={styles.signupButton}
        >
          <Text style={styles.text}>
            No Account? Signup
          </Text>
        </TouchableOpacity>

      </LinearGradient>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
