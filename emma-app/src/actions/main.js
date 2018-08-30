import type { MainAction } from 'actions/main.js.flow'
import {
  SUGGESTION_FETCH_BEGIN,
  SUGGESTION_FETCH_SUCCESS,
  SUGGESTION_FETCH_FAIL,
  CHECK_SUGGESTION_TIME,
  CHECK_SUGGESTION_TIME_SUCCESS,
  CHECK_SUGGESTION_TIME_FAIL,
  SET_SUGGESTION_TIME,
  SET_SUGGESTION_TIME_SUCCESS,
  SET_SUGGESTION_TIME_FAIL
} from './../constants/action-types'
import type { Dispatch } from './../types/Store'
import { setItem, getItem } from './../utils/asyncStorage'

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
      if (data.length > 0) {
        dispatch(suggestionFetchSuccess(data[0]))
      } else {
        throw new Error('No suggestion found')
      }
    } catch (e) {
      dispatch(suggestionFetchFail(e))
    }
  }
}

const suggestionFetchSuccess = (payload: any): MainAction => {
  return dispatch => {
    dispatch({
      type: SUGGESTION_FETCH_SUCCESS,
      payload
    })
  }
}

const suggestionFetchFail = (error: Error): MainAction => ({
  type: SUGGESTION_FETCH_FAIL,
  payload: error
})

export const checkSuggestionsTime = (): MainAction => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CHECK_SUGGESTION_TIME
    })
    try {
      const time = await getItem('@app/suggestionReceivedAt')

      dispatch(checkSuggestionTimeSuccess(time))
    } catch (e) {
      dispatch(checkSuggestionTimeFail(e))
    }
  }
}

const checkSuggestionTimeSuccess = (payload: Date): MainAction => ({
  type: CHECK_SUGGESTION_TIME_SUCCESS,
  payload
})

const checkSuggestionTimeFail = (payload: Error): MainAction => ({
  type: CHECK_SUGGESTION_TIME_FAIL,
  payload
})

export const setSuggestionTime = (time: Date): MainAction => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_SUGGESTION_TIME
    })
    try {
      const result = await setItem('@app/suggestionReceivedAt', time)

      dispatch(setSuggestionTimeSuccess(result))
    } catch (e) {
      dispatch(setSuggestionTimeFail(e))
    }
  }
}

const setSuggestionTimeSuccess = (payload: Date): MainAction => ({
  type: SET_SUGGESTION_TIME_SUCCESS,
  payload
})

const setSuggestionTimeFail = (payload: Error): MainAction => ({
  type: SET_SUGGESTION_TIME_FAIL,
  payload
})
