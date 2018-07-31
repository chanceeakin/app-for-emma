import { createStore, applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import type { Store } from './types/Store'
import { middleware } from './navigation'

import reducers from './reducers' //Import the reducer

const middlewares = [thunk, middleware]

// Connect our store to the reducers
export const store: Store = createStore(
  reducers,
  applyMiddleware(...middlewares)
)
