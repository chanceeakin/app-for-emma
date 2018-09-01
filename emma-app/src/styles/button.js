// @flow
import colors from './colors'
import type Styles from './../types/Styles.js.flow'

const button: Styles = {
  bigButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.inkBlue,
    borderRadius: 5,
  },
  bigButtonText: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.inkBlue,
  },
  settingsButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: colors.duskyRose,
    borderRadius: 5,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  mediumButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: colors.darkBlue,
    borderRadius: 5,
  },
  mediumButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  errorButton: {
    backgroundColor: colors.error,
  },
  errorText: {
    color: colors.white,
  },
  backButton: {
    padding: 15,
  },
}

export default button
