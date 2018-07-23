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
  updateFirstNameText,
  updateLastNameText,
  updatePasswordText,
  updateEmailText,
  signupUser
} from './../actions/signup'
import colors from './../constants/colors'
import { loginPage, mainPage } from './../actions/navigation'
import GradientWrapper from './../components/backgroundWrapper'

const mapStateToProps = state => ({
  firstName: state.containers.signup.firstName,
  password: state.containers.signup.password,
  email: state.containers.signup.email
})

const mapDispatchToProps = {
  updateFirstNameText,
  updateLastNameText,
  updatePasswordText,
  updateEmailText,
  signupUser,
  mainPage,
  loginPage
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  font: {
    fontFamily: 'Skia'
  },
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
  backButton: {
    padding: 5,
    paddingBottom: 15
  }
})

class LoginView extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { firstName, lastName, password, email } = this.props
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          <Text
            style={[styles.title, this.props.isFontLoaded ? styles.font : null]}
          >
            Signup
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.updateFirstNameText(text)}
            value={firstName}
            placeholder="First Name"
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.updateLastNameText(text)}
            value={lastName}
            placeholder="Last Name"
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.updateEmailText(text)}
            value={email}
            placeholder="Email"
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.updatePasswordText(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            onBlur={Keyboard.dismiss}
          />
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() =>
              this.props.signupUser({
                firstName: firstName,
                email: email,
                password: password
              })
            }
          >
            <Text style={styles.bigButtonText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
