import type { MainAction } from 'actions/main.js.flow'
import {
  SUGGESTION_FETCH_BEGIN,
  SUGGESTION_FETCH_SUCCESS,
  SUGGESTION_FETCH_FAIL
} from './../constants/action-types'
import callGraphQL from './../utils/graphql'

export const fetchSuggestions = ():MainAction => {
  return async dispatch => {
    dispatch({
      type:  SUGGESTION_FETCH_BEGIN
    })
    try {
      const call = await callGraphQL(`
      query Suggestions {
        suggestions {
        id
        title
        description
        tags
      }
    }`)
      dispatch({
        type: SUGGESTION_FETCH_SUCCESS,
        payload: call.suggestions
      })
    } catch (e) {
      dispatch({
        type: SUGGESTION_FETCH_FAIL,
        payload: e
      })
    }
  }
}
