// @flow
import button from './button'
import modal from './modal'
import colors from './colors'
import pageLayout from './pageLayout'
import forms from './forms'
import font from './font'
import text from './text'
import type Styles from './../types/Styles.js.flow'

export { button, modal, colors, pageLayout, forms, font, text }

const styles: {
  button: Styles,
  modal: Styles,
  pageLayout: Styles,
  forms: Styles,
  font: Styles,
  text: Styles,
} = { button, modal, colors, pageLayout, forms, font, text }

export default styles
