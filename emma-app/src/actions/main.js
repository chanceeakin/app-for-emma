import type { MainAction } from 'actions/main.js.flow'
import {
  SUGGESTION_FETCH_BEGIN,
  SUGGESTION_FETCH_SUCCESS,
  SUGGESTION_FETCH_FAIL
} from './../constants/action-types'

export const fetchSuggestions = (): MainAction => {
  return async dispatch => {
    dispatch({
      type: SUGGESTION_FETCH_BEGIN
    })
    try {
      const response = await fetch('http://localhost:8000/random-suggestion', {
        method: 'GET'
      })
      const data = await response.json()
      dispatch({
        type: SUGGESTION_FETCH_SUCCESS,
        payload: data
      })
    } catch (e) {
      dispatch({
        type: SUGGESTION_FETCH_FAIL,
        payload: e
      })
    }
  }
}
