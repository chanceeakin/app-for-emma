import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'

import { updateUserNameText, updatePasswordText } from './../actions/login'

import { mainPage, signupPage } from './../actions/navigation'
import colors from './../constants/colors'
import GradientWrapper from './../components/backgroundWrapper'

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
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    marginBottom: 30,
    color: colors.darkPurple
  },
  font: {
    fontFamily: 'Skia'
  },
  description: {
    marginTop: 5,
    fontSize: 14
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: colors.darkBlue,
    minWidth: 200
  },
  bigButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: colors.darkBlue,
    borderRadius: 2
  },
  bigButtonText: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.white
  },
  signupButton: {
    padding: 5,
    paddingBottom: 15
  },
  text: {
    color: colors.inkBlue
  }
})

class LoginView extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { userName, password } = this.props

    return (
      <GradientWrapper>
        <View style={styles.row}>
          <Text
            style={[styles.title, this.props.isFontLoaded ? styles.font : null]}
          >
            Login
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.updateUserNameText(text)}
            value={userName}
            placeholder="User Name"
            placeholderTextColor={colors.white}
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.updatePasswordText(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={colors.white}
            onBlur={Keyboard.dismiss}
          />
          <TouchableOpacity
            style={styles.bigButton}
            onPress={this.props.mainPage}
          >
            <Text
              style={[
                styles.bigButtonText,
                this.props.isFontLoaded ? styles.font : null
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.props.signupPage}
          style={styles.signupButton}
        >
          <Text style={styles.text}>No Account? Signup</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
