import { createStore } from "redux";
import  combineReducer  from "./reducers/combineReducers";

const store = createStore(combineReducer);

export default store;