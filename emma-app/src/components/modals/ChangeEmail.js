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
  Keyboard
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
  modal,
  modalTitle,
  bigButton,
  bigButtonText,
  mediumButton,
  mediumButtonText,
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
  backButton: {
    padding: 15
  }
})

type Props = {
  updatedEmail: string,
  updateEmailPatchTextField: SettingsAction,
  isPatchingEmailError?: boolean,
  changeEmail: () => void
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
    const {
      updateEmailPatchTextField,
      isPatchingEmailError,
      updatedEmail,
      changeEmail
    } = this.props
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
                  isPatchingEmailError ? styles.errorButton : null
                ]}
                onPress={changeEmail}
              >
                <Text
                  style={[
                    styles.bigButtonText,
                    isPatchingEmailError ? styles.errorText : null
                  ]}
                >
                  Change Email
                </Text>
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

        <TouchableHighlight
          style={styles.mediumButton}
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Text style={styles.mediumButtonText}>Change Email</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
