// @flow
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import rootReducer from "./reducer";
import type { Store } from "./types/Store";

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

if (process.env.NODE_ENV === "development") {
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store: Store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
