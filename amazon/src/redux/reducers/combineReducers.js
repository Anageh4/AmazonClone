import { combineReducers } from "redux";
import basketReducer from "./basket";
import registerReducer from "./user";

 const combineReducer = combineReducers({
  basketReducer: basketReducer,
  userReducer: registerReducer,
});

export default combineReducer;