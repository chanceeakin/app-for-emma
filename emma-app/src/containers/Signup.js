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
  updatePasswordText
} from './../actions/signup'

import {
  mainPage
} from './../actions/navigation'

const mapStateToProps = state => ({
  userName: state.signup.username,
  password: state.signup.password
})

const mapDispatchToProps = {
  updateUserNameText,
  updatePasswordText,
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
    const {userName, password} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Signup</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.updateUserNameText(text)}
            value={userName}
            placeholder="User Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.updatePasswordText(text)}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.bigButton}
            onPress={this.props.mainPage}
          >
            <Text style={styles.bigButtonText}>
              Signup
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
