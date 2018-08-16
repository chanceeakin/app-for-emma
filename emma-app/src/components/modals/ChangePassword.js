// @flow
import React, { Component } from 'react'
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput
} from 'react-native'
import GradientWrapper from './../backgroundWrapper'
import { colors, button, modal as modalStyle } from './../../styles'
import type { SettingsAction } from './../../actions/Settings.js.flow'

const { bigButton, bigButtonText, mediumButton, mediumButtonText } = button
const { modal, modalTitle } = modalStyle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: colors.darkBlue,
    minWidth: 200
  },
  errorButton: {
    backgroundColor: colors.error
  },
  errorText: {
    color: colors.white
  },
  modal,
  modalTitle,
  bigButton,
  bigButtonText,
  mediumButton,
  mediumButtonText,
  backButton: {
    padding: 15
  }
})

type Props = {
  updatePasswordPatchTextField: SettingsAction,
  updatedPassword: string
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
    const { updatePasswordPatchTextField, updatedPassword } = this.props
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
            <Text style={styles.modalTitle}>Change Email</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={text => updatePasswordPatchTextField(text)}
                value={updatedPassword}
                secureTextEntry
                placeholder="Change Password"
                placeholderTextColor={colors.inkBlue}
                autoCapitalize="none"
                onBlur={Keyboard.dismiss}
              />
              <TouchableOpacity style={styles.bigButton}>
                <Text style={styles.bigButtonText}>Change Password</Text>
              </TouchableOpacity>

              <TouchableHighlight
                style={styles.backButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <Text>Back</Text>
              </TouchableHighlight>
            </View>
          </GradientWrapper>
        </Modal>

        <TouchableHighlight
          style={styles.mediumButton}
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Text style={styles.mediumButtonText}>Change Password</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
