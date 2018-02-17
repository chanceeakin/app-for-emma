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
} from './../actions/login'

import {mainPage} from './../actions/navigation'

const mapStateToProps = state => ({
  userName: state.login.username,
  password: state.login.password
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
    justifyContent: 'center',
    flex: 1
  },
  row:{
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // height: 50,
    padding: 10
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


class Screen2 extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {userName, password} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen2)
