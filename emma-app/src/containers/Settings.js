// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'

import type { Suggestion } from './../types/Suggestions.js.flow'
import {
  updateEmailPatchTextField,
  updateOldPasswordPatchTextField,
  updateNewPassword1PatchTextField,
  updateNewPassword2PatchTextField,
  toggleEmailModal,
  changeEmail,
  togglePasswordModal,
  logout
} from './../actions/settings'
import {
  updatedEmailSelector,
  updatedOldPasswordSelector,
  updatedNewPassword1Selector,
  updatedNewPassword2Selector,
  isPatchingEmailErrorSelector,
  emailModalSelector,
  passwordModalSelector
} from './../reducers/containers/settings'
import { button, colors, pageLayout } from './../styles'
import type { SettingsAction } from './../actions/settings.js.flow'
import GradientWrapper from './../components/backgroundWrapper'
import ChangeEmailModal from './../components/modals/ChangeEmail'
import ChangePasswordModal from './../components/modals/ChangePassword'
import LogoutModal from './../components/modals/Logout'

const mapStateToProps = state => ({
  updatedEmail: updatedEmailSelector(state),
  updatedOldPassword: updatedOldPasswordSelector(state),
  updatedNewPassword1: updatedNewPassword1Selector(state),
  updatedNewPassword2: updatedNewPassword2Selector(state),
  isPatchingEmailError: isPatchingEmailErrorSelector(state),
  isEmailModalShown: emailModalSelector(state),
  isPasswordModalShown: passwordModalSelector(state)
})

const mapDispatchToProps = {
  updateEmailPatchTextField,
  updateOldPasswordPatchTextField,
  updateNewPassword1PatchTextField,
  updateNewPassword2PatchTextField,
  logout,
  changeEmail,
  toggleEmailModal,
  togglePasswordModal
}

const { bigButton, bigButtonText } = button
const { container } = pageLayout

const styles = StyleSheet.create({
  container,
  icon: {
    margin: 10
  },
  font: {
    fontFamily: 'Skia'
  },
  title: {
    flex: 1,
    fontSize: 72,
    textAlign: 'center',
    color: colors.inkBlue
  },
  description: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.darkPurple
  },
  row: {
    minHeight: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  bigButton,
  bigButtonText,
  bigNumber: {
    fontSize: 48
  },
  backButton: {
    padding: 5,
    paddingBottom: 15
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
  logout: SettingsAction,
  updateEmailPatchTextField: SettingsAction,
  updateOldPasswordPatchTextField: SettingsAction,
  updateNewPassword1PatchTextField: SettingsAction,
  updateNewPassword2PatchTextField: SettingsAction,
  updatedEmail: string,
  updatedOldPassword: string,
  updatedNewPassword1: string,
  updatedNewPassword2: string,
  isPatchingEmailError: boolean,
  changeEmail: SettingsAction,
  navigation: any,
  toggleEmailModal: SettingsAction,
  isEmailModalShown: boolean,
  togglePasswordModal: SettingsAction,
  isPasswordModalShown: boolean
};

class MainView extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  goBack = () => {
    this.props.navigation.goBack()
  };

  changeEmail = () => {
    this.props.changeEmail()
  };

  handleLogout = () => {
    this.props.logout()
  };

  render() {
    const {
      updatedEmail,
      updatedOldPassword,
      updatedNewPassword1,
      updatedNewPassword2,
      isPatchingEmailError,
      updateEmailPatchTextField,
      updateOldPasswordPatchTextField,
      updateNewPassword1PatchTextField,
      updateNewPassword2PatchTextField,
      toggleEmailModal,
      isEmailModalShown,
      togglePasswordModal,
      isPasswordModalShown
    } = this.props
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.title, styles.font]}>Settings</Text>
        </View>
        <View style={styles.row}>
          <ChangeEmailModal
            changeEmail={this.changeEmail}
            updateEmailPatchTextField={updateEmailPatchTextField}
            isPatchingEmailError={isPatchingEmailError}
            updatedEmail={updatedEmail}
            isEmailModalShown={isEmailModalShown}
            toggleEmailModal={toggleEmailModal}
          />
          <ChangePasswordModal
            updatedOldPassword={updatedOldPassword}
            updatedNewPassword1={updatedNewPassword1}
            updatedNewPassword2={updatedNewPassword2}
            updateOldPasswordPatchTextField={updateOldPasswordPatchTextField}
            updateNewPassword1PatchTextField={updateNewPassword1PatchTextField}
            updateNewPassword2PatchTextField={updateNewPassword2PatchTextField}
            isPasswordModalShown={isPasswordModalShown}
            togglePasswordModal={togglePasswordModal}
          />
          <LogoutModal handleLogout={this.handleLogout} />
        </View>
        <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
