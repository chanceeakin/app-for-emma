import React, {
  Component
} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {loginPage} from './../actions/navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bada55',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    margin: 10
  },
  text: {
    fontSize: 72
  },
  row: {
    height: 100,
    flexDirection: 'row'
  },
  bigNumber: {
    fontSize: 48
  },
  bigButton: {
    marginTop: 5,
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

export default class Screen1View extends Component {
  static navigationOptions = {
    header: null
  }

  navigate = () => {
    this.props.navigation.dispatch(loginPage)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Foodie</Text>
        <View style={styles.row}>
          <Icon
            name="glass"
            style={styles.icon}
            size={50}
          />
        </View>
        <TouchableOpacity
          style={styles.bigButton}
          onPress={this.navigate}
        >
          <Text style={styles.bigButtonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
