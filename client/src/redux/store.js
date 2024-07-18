// store.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import authReducer from "./user";

const store = createStore(
  combineReducers({ authReducer }),
  applyMiddleware(logger, thunk)
);

export default store;
