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
import colors from './../../constants/colors'
import type { SettingsAction } from './../../actions/Settings.js.flow'

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
          <Text>Change Password</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
