import { combineReducers } from "redux";

import { listReducer } from "./listReducer";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  list: listReducer,
  auth: authReducer,
  users: userReducer
});
