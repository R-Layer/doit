import { combineReducers } from "redux";

import { listReducer } from "./listReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  list: listReducer,
  auth: authReducer
});
