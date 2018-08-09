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
import colors from './../../constants/colors'
import type { SettingsAction } from './../../actions/Settings.js.flow'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
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
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <GradientWrapper color="orange" style={styles.container}>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={text => updateEmailPatchTextField(text)}
                value={updatedEmail}
                placeholder="Change Email"
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
          <Text>Change Email</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
