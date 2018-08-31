import type Styles from './../types/Styles.js.flow'

export const pageLayout: Styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    minHeight: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
}

export default pageLayout
