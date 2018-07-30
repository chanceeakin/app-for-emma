// @flow
import {
  SUGGESTION_FETCH_FAIL,
  SUGGESTION_FETCH_BEGIN,
  SUGGESTION_FETCH_SUCCESS
} from '../constants/action-types'
import type { Action } from './../types/Action.js.flow'
import type { Suggestion } from './../types/Suggestions.js.flow'
import type { Store } from './../types/Store.js.flow'

type State = {
  isCallingSuggestions: boolean,
  suggestions: Suggestion,
  isError: boolean
};

const initialState: State = {
  isCallingSuggestions: false,
  suggestions: {},
  isError: false
}

const appReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
  case SUGGESTION_FETCH_BEGIN:
    return {
      ...state,
      isCallingSuggestions: true
    }
  case SUGGESTION_FETCH_SUCCESS:
    return {
      ...state,
      isCallingSuggestions: false,
      suggestions: action.payload
    }
  case SUGGESTION_FETCH_FAIL:
    return {
      ...state,
      isCallingSuggestions: false,
      isError: true
    }
  default:
    return state
  }
}

export default appReducer

export function getSuggestions(state: Store) {
  return state.suggestions.suggestions
}
