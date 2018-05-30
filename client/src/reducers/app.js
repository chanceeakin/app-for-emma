// @flow
import {
  INCREMENT_REQUESTED,
  INCREMENT,
  DECREMENT_REQUESTED,
  DECREMENT
} from "constants/actionTypes";
import type { Action } from "types/Action";

type State = {
  count: number,
  isIncrementing: boolean,
  isDecrementing: boolean
};

const initialState: State = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      };

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      };

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      };

    default:
      return state;
  }
};
