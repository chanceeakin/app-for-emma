// @flow
import React, {
  Component
} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {LinearGradient} from 'expo'

import {loginPage} from './../actions/navigation'

const mapStateToProps = state => ({
  isFontLoaded: state.app.isFontLoaded
})

const mapDispatchToProps = {
  loginPage
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 72,
    color: '#C5CC08',
    textAlign: 'center',
    fontFamily: 'Skia'
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
    color: 'white',
    textAlign: 'center'
  }
})

class SplashView extends Component {
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <LinearGradient
        colors={['#041069', '#69044E']}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.25, 0.4, 1]}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          {this.props.isFontLoaded ? (
            <Text style={styles.text}>Daily Practice</Text>
          ) : null
          }
          <TouchableOpacity
            style={styles.bigButton}
            onPress={this.props.loginPage}
          >
            <Text style={styles.bigButtonText}>
            Login
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashView)
