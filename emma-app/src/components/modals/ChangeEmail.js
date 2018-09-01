// @flow
import React, { Component } from 'react'
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import GradientWrapper from './../wrappers/GradientWrapper'
import {
  colors,
  button,
  modal as modalStyle,
  pageLayout,
  forms,
} from './../../styles'
import type { SettingsAction } from './../../actions/Settings.js.flow'

const {
  bigButton,
  bigButtonText,
  settingsButton,
  settingsButtonText,
  mediumButton,
  mediumButtonText,
  errorButton,
  errorText,
  backButton,
} = button
const { modal, modalTitle } = modalStyle
const { input } = forms
const { container } = pageLayout

const styles = StyleSheet.create({
  container,
  modal,
  modalTitle,
  bigButton,
  bigButtonText,
  settingsButton,
  settingsButtonText,
  mediumButton,
  mediumButtonText,
  input,
  errorButton,
  errorText,
  backButton,
})

type Props = {
  updatedEmail: string,
  updateEmailPatchTextField: SettingsAction,
  isPatchingEmailError?: boolean,
  changeEmail: () => void,
  isEmailModalShown: boolean,
  toggleEmailModal: SettingsAction,
};

export default class ModalComponent extends Component<Props> {
  render() {
    const {
      updateEmailPatchTextField,
      isPatchingEmailError,
      updatedEmail,
      changeEmail,
      isEmailModalShown,
      toggleEmailModal,
    } = this.props
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={isEmailModalShown}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <GradientWrapper color="orange" style={styles.modal}>
            <Text style={styles.modalTitle}>Change Email</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={text => updateEmailPatchTextField(text)}
                value={updatedEmail}
                placeholder="New Email"
                placeholderTextColor={colors.inkBlue}
                autoCapitalize="none"
                onBlur={Keyboard.dismiss}
              />
              <TouchableOpacity
                style={[
                  styles.bigButton,
                  isPatchingEmailError ? styles.errorButton : null,
                ]}
                onPress={changeEmail}
              >
                <Text
                  style={[
                    styles.bigButtonText,
                    isPatchingEmailError ? styles.errorText : null,
                  ]}
                >
                  Change Email
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableHighlight
              style={styles.backButton}
              onPress={toggleEmailModal}
            >
              <Text>Back</Text>
            </TouchableHighlight>
          </GradientWrapper>
        </Modal>

        <TouchableHighlight
          style={styles.settingsButton}
          onPress={toggleEmailModal}
        >
          <Text style={styles.settingsButtonText}>Change Email</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
