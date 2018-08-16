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
  updatePasswordPatchTextField,
  changeEmail
} from './../actions/settings'
import { logout } from './../actions/settings'
import {
  updatedEmailSelector,
  updatedPasswordSelector,
  isPatchingEmailErrorSelector
} from './../reducers/containers/settings'
import { button, colors } from './../styles'
import type { SettingsAction } from './../actions/settings.js.flow'
import GradientWrapper from './../components/backgroundWrapper'
import ChangeEmailModal from './../components/modals/ChangeEmail'
import ChangePasswordModal from './../components/modals/ChangePassword'
import LogoutModal from './../components/modals/Logout'

const mapStateToProps = state => ({
  updatedEmail: updatedEmailSelector(state),
  updatedPassword: updatedPasswordSelector(state),
  isPatchingEmailError: isPatchingEmailErrorSelector(state)
})

const mapDispatchToProps = {
  updateEmailPatchTextField,
  updatePasswordPatchTextField,
  logout,
  changeEmail
}

const { bigButton, bigButtonText } = button

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
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
  updatePasswordPatchTextField: SettingsAction,
  updatedEmail: string,
  updatedPassword: string,
  isPatchingEmailError: boolean,
  changeEmail: SettingsAction,
  navigation: any
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
      updatedPassword,
      isPatchingEmailError,
      updateEmailPatchTextField,
      updatePasswordPatchTextField
    } = this.props
    return (
      <GradientWrapper style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.title, styles.font]}>Settings</Text>
        </View>
        <ChangeEmailModal
          changeEmail={this.changeEmail}
          updateEmailPatchTextField={updateEmailPatchTextField}
          isPatchingEmailError={isPatchingEmailError}
          updatedEmail={updatedEmail}
        />
        <ChangePasswordModal
          updatedPassword={updatedPassword}
          updatePasswordPatchTextField={updatePasswordPatchTextField}
        />
        <LogoutModal handleLogout={this.handleLogout} />
        <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </GradientWrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
