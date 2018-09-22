import type { MainAction } from 'actions/main.js.flow'
import {
  ASYNC_SUGGESTION_FETCH,
  ASYNC_SUGGESTION_FETCH_SUCCESS,
  ASYNC_SUGGESTION_FETCH_FAIL,
  SUGGESTION_FETCH_BEGIN,
  SUGGESTION_FETCH_SUCCESS,
  SUGGESTION_FETCH_FAIL,
  CHECK_SUGGESTION_TIME,
  CHECK_SUGGESTION_TIME_SUCCESS,
  CHECK_SUGGESTION_TIME_FAIL,
  SET_SUGGESTION_TIME,
  SET_SUGGESTION_TIME_SUCCESS,
  SET_SUGGESTION_TIME_FAIL,
} from './../constants/action-types'
import { TWELVE_HOURS_IN_MS } from './../constants/time'
import { apiUrl } from './../constants/urls'
import type { Dispatch } from './../types/Store'
import { setItem, getItem } from './../utils/asyncStorage'

export const fetchSuggestions = (): MainAction => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SUGGESTION_FETCH_BEGIN,
    })
    try {
      const response = await fetch(`${apiUrl}/random-suggestion`, {
        method: 'GET',
      })
      const data = await response.json()
      if (data.length > 0) {
        const existingSuggestion: string = await getItem('@APP/suggestion')
        let parsedExistingSuggestion: ?Suggestion
        if (existingSuggestion) {
          parsedExistingSuggestion = await JSON.parse(existingSuggestion)
        }
        if (
          parsedExistingSuggestion &&
          parsedExistingSuggestion.id === data[0].id
        ) {
          dispatch(fetchSuggestions())
        }
        const time = new Date()
        dispatch(setSuggestionTime(time))
        dispatch(suggestionFetchSuccess(data[0]))
      } else {
        throw new Error('No suggestion found')
      }
    } catch (e) {
      console.warn(e)
      dispatch(suggestionFetchFail(e))
    }
  }
}

const suggestionFetchSuccess = (payload: Suggestion): MainAction => {
  return async dispatch => {
    try {
      dispatch({
        type: SUGGESTION_FETCH_SUCCESS,
        payload,
      })
      await setItem('@APP/suggestion', JSON.stringify(payload))
    } catch (e) {
      dispatch(suggestionFetchFail(e))
    }
  }
}

const suggestionFetchFail = (error: Error): MainAction => ({
  type: SUGGESTION_FETCH_FAIL,
  payload: error,
})

export const checkSuggestionsTime = (): MainAction => {
  return async (dispatch: Dispatch, getState) => {
    dispatch({
      type: CHECK_SUGGESTION_TIME,
    })
    try {
      const time: Date = await getItem('@APP/suggestionReceivedAt')
      const now: Date = Date()

      if (Date(time) + TWELVE_HOURS_IN_MS >= Date(now)) {
        dispatch(checkSuggestionTimeSuccess(time))
        dispatch(fetchAsyncStoredSuggestion())
        return
      }
      dispatch(fetchSuggestions())
      dispatch(checkSuggestionTimeSuccess(time))
    } catch (e) {
      dispatch(checkSuggestionTimeFail(e))
    }
  }
}

const checkSuggestionTimeSuccess = (payload: Date): MainAction => ({
  type: CHECK_SUGGESTION_TIME_SUCCESS,
  payload,
})

const checkSuggestionTimeFail = (payload: Error): MainAction => ({
  type: CHECK_SUGGESTION_TIME_FAIL,
  payload,
})

export const setSuggestionTime = (time: Date): MainAction => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_SUGGESTION_TIME,
    })
    try {
      const result = await setItem('@APP/suggestionReceivedAt', time)
      dispatch(setSuggestionTimeSuccess(result))
    } catch (e) {
      dispatch(setSuggestionTimeFail(e))
    }
  }
}

const setSuggestionTimeSuccess = (payload: Date): MainAction => ({
  type: SET_SUGGESTION_TIME_SUCCESS,
  payload,
})

const setSuggestionTimeFail = (payload: Error): MainAction => ({
  type: SET_SUGGESTION_TIME_FAIL,
  payload,
})

export const fetchAsyncStoredSuggestion = (): MainAction => {
  return async dispatch => {
    dispatch({
      type: ASYNC_SUGGESTION_FETCH,
    })
    try {
      const result = await getItem('@APP/suggestion')
      const parsedResult = JSON.parse(result)
      dispatch(fetchAsyncSSSuccess(parsedResult))
    } catch (e) {
      dispatch(fetchAsyncSSFail(e))
    }
  }
}

const fetchAsyncSSSuccess = (payload: Suggestion): MainAction => {
  return {
    type: ASYNC_SUGGESTION_FETCH_SUCCESS,
    payload,
  }
}

const fetchAsyncSSFail = (payload: Error): MainAction => ({
  type: ASYNC_SUGGESTION_FETCH_FAIL,
  payload,
})
