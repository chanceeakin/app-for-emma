import {
  createStore,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { middleware } from './utils/redux'
import type { Store } from './types/Store'

import reducers from './reducers' //Import the reducer

const middlewares = [
  thunk,
  middleware
]

// Connect our store to the reducers
export const store: Store =  createStore(reducers, applyMiddleware(...middlewares))
