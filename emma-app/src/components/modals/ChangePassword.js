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
  TextInput,
} from 'react-native'
import GradientWrapper from './../wrappers/GradientWrapper'
import {
  forms,
  colors,
  button,
  modal as modalStyle,
  pageLayout,
} from './../../styles'
import type { SettingsAction } from './../../actions/Settings.js.flow'

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
const { input } = forms

const styles = StyleSheet.create({
  container,
  input,
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
  updateOldPasswordPatchTextField: SettingsAction,
  updateNewPassword1PatchTextField: SettingsAction,
  updateNewPassword2PatchTextField: SettingsAction,
  updatedOldPassword: string,
  updatedNewPassword1: string,
  updatedNewPassword2: string,
  isPasswordModalShown: boolean,
  togglePasswordModal: SettingsAction,
};
export default class ModalComponent extends Component<Props> {
  render() {
    const {
      updateOldPasswordPatchTextField,
      updatedOldPassword,
      updateNewPassword1PatchTextField,
      updateNewPassword2PatchTextField,
      updatedNewPassword1,
      updatedNewPassword2,
      togglePasswordModal,
      isPasswordModalShown,
    } = this.props
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={isPasswordModalShown}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <GradientWrapper color="orange" style={styles.modal}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={text => updateOldPasswordPatchTextField(text)}
                value={updatedOldPassword}
                secureTextEntry
                placeholder="Enter Old Password"
                placeholderTextColor={colors.inkBlue}
                autoCapitalize="none"
                onBlur={Keyboard.dismiss}
              />
              <TextInput
                style={styles.input}
                onChangeText={text => updateNewPassword1PatchTextField(text)}
                value={updatedNewPassword1}
                secureTextEntry
                placeholder="Enter New Password"
                placeholderTextColor={colors.inkBlue}
                autoCapitalize="none"
                onBlur={Keyboard.dismiss}
              />
              <TextInput
                style={styles.input}
                onChangeText={text => updateNewPassword2PatchTextField(text)}
                value={updatedNewPassword2}
                secureTextEntry
                placeholder="Enter New Password Again"
                placeholderTextColor={colors.inkBlue}
                autoCapitalize="none"
                onBlur={Keyboard.dismiss}
              />
              <TouchableOpacity style={styles.bigButton}>
                <Text style={styles.bigButtonText}>Change Password</Text>
              </TouchableOpacity>
            </View>

            <TouchableHighlight
              style={styles.backButton}
              onPress={togglePasswordModal}
            >
              <Text>Back</Text>
            </TouchableHighlight>
          </GradientWrapper>
        </Modal>

        <TouchableHighlight
          style={styles.settingsButton}
          onPress={togglePasswordModal}
        >
          <Text style={styles.settingsButtonText}>Change Password</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
