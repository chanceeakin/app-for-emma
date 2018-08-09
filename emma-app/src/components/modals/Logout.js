// @flow
import React, { Component } from 'react'
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import GradientWrapper from './../backgroundWrapper'
import colors from './../../constants/colors'
import type { SettingsAction } from './../../actions/settings.js.flow'

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    flex: 1
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
  }
})

type Props = {
  handleLogout: SettingsAction
};

type State = {
  modalVisible: boolean
};

export default class ModalComponent extends Component<Props, State> {
  state = {
    modalVisible: false
  };

  setModalVisible(visible: boolean): void {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { handleLogout } = this.props
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <GradientWrapper color="orange" style={styles.container}>
            <View>
              <TouchableOpacity onPress={handleLogout} style={styles.bigButton}>
                <Text style={styles.bigButtonText}>Logout</Text>
              </TouchableOpacity>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </GradientWrapper>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
