// @flow
import React, { Component } from 'react'
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import GradientWrapper from './../wrappers/GradientWrapper'
import { button, modal as modalStyle, pageLayout } from './../../styles'
import type { SettingsAction } from './../../actions/settings.js.flow'

const {
  bigButton,
  bigButtonText,
  settingsButton,
  settingsButtonText,
  errorButton,
  errorText,
  backButton,
} = button

const { modal, modalTitle } = modalStyle
const { container } = pageLayout

const styles: StyleSheet = StyleSheet.create({
  container,
  modal,
  modalTitle,
  bigButton,
  bigButtonText,
  settingsButton,
  settingsButtonText,
  errorButton,
  errorText,
  backButton,
})

type Props = {
  handleLogout: SettingsAction,
};

type State = {
  modalVisible: boolean,
};

export default class ModalComponent extends Component<Props, State> {
  state = {
    modalVisible: false,
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
              style={styles.backButton}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}
            >
              <Text>Back</Text>
            </TouchableHighlight>
          </GradientWrapper>
        </Modal>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Text style={styles.settingsButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
