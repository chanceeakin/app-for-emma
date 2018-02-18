import React, {
  Component
} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


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

export default class MainView extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        <View style={styles.row}>
          <Icon
            name="glass"
            style={styles.icon}
            size={50}
          />
        </View>
      </View>
    )
  }
}
