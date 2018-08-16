//@flow
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

import {
  updateUserNameText,
  updatePasswordText,
  beginLogin
} from './../actions/login'
import type { LoginAction } from './../actions/login.js.flow'

import { mainPage, signupPage } from './../actions/navigation'
import { colors, button } from './../styles'
import GradientWrapper from './../components/backgroundWrapper'

const mapStateToProps = state => ({
  email: state.containers.login.email,
  password: state.containers.login.password,
  isFontLoaded: state.app.isFontLoaded,
  isLoginError: state.containers.login.isLoginError
})

const mapDispatchToProps = {
  updateUserNameText,
  updatePasswordText,
  mainPage,
  beginLogin,
  signupPage
}

const { bigButton, bigButtonText } = button

const styles = StyleSheet.create({
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
  bigButton,
  bigButtonText,
  signupButton: {
    padding: 5,
    paddingBottom: 15
  },
  text: {
    color: colors.inkBlue
  },
  errorButton: {
    backgroundColor: colors.error
  },
  errorText: {
    color: colors.white
  }
})

type Props = {
  beginLogin: LoginAction,
  updateUserNameText: LoginAction,
  updatePasswordText: LoginAction,
  signupPage: () => void,
  mainPage: () => void,
  email: string,
  password: string
};

class LoginView extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    const { email, password } = this.props

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
            value={email}
            placeholder="Email"
            placeholderTextColor={colors.inkBlue}
            autoCapitalize="none"
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.updatePasswordText(text)}
            value={password}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor={colors.inkBlue}
            onBlur={Keyboard.dismiss}
          />
          <TouchableOpacity
            style={[
              styles.bigButton,
              this.props.isLoginError ? styles.errorButton : null
            ]}
            onPress={() =>
              this.props.beginLogin({
                email: email,
                password: password
              })
            }
            disabled={this.props.isLoginError}
          >
            <Text
              style={[
                styles.bigButtonText,
                this.props.isFontLoaded ? styles.font : null,
                this.props.isLoginError ? styles.errorText : null
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
          <Text style={[styles.text]}>No Account? Signup</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
