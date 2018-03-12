import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'

import {
  updateUserNameText,
  updatePasswordText,
  updateEmailText,
  signupUser
} from './../actions/signup'

import {
  mainPage
} from './../actions/navigation'

const mapStateToProps = state => ({
  username: state.signup.username,
  password: state.signup.password,
  email: state.signup.email
})

const mapDispatchToProps = {
  updateUserNameText,
  updatePasswordText,
  updateEmailText,
  signupUser,
  mainPage
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
    marginBottom: 30
  },
  description:{
    marginTop: 5,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: 'black',
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
    color: 'white'
  }
})


class LoginView extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {
      username,
      password,
      email
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Signup</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.updateUserNameText(text)}
            value={username}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.updateEmailText(text)}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.updatePasswordText(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
          />
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => this.props.signupUser({
              username: username,
              email: email,
              password: password
            })}
          >
            <Text
              style={styles.bigButtonText}
            >
              Signup
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
