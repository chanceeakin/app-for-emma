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
import { colors, button } from './../../styles'
import type { SettingsAction } from './../../actions/settings.js.flow'

const { bigButton, bigButtonText, mediumButton, mediumButtonText } = button

const styles: StyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 45,
    textAlign: 'center'
  },
  bigButton,
  bigButtonText,
  mediumButton,
  mediumButtonText,
  errorButton: {
    backgroundColor: colors.error
  },
  errorText: {
    color: colors.white
  },
  backButton: {
    padding: 15
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
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <GradientWrapper color="orange" style={styles.modal}>
            <Text style={styles.modalTitle}>Logout</Text>
            <View>
              <TouchableOpacity onPress={handleLogout} style={styles.bigButton}>
                <Text style={styles.bigButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}
            >
              <Text>Back</Text>
            </TouchableHighlight>
          </GradientWrapper>
        </Modal>

        <TouchableOpacity
          style={styles.mediumButton}
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Text style={styles.mediumButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
