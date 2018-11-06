import { combineReducers } from "redux";

import { registerUser, fetchUsers, updateUser, deleteUser } from "../types";

const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case registerUser.REQUEST:
      return { isPending: true };
    case registerUser.SUCCESS:
      return { data: action.payload };
    case registerUser.FAILURE:
      return action.payload;
    default:
      return state;
  }
};

const fetchUsersReducer = (state = [], action) => {
  switch (action.type) {
    case fetchUsers.REQUEST:
      return { isPending: true };
    case fetchUsers.SUCCESS:
      return { data: action.payload };
    case fetchUsers.FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
};

const updateUserReducer = (state = [], action) => {
  switch (action.type) {
    case updateUser.REQUEST:
      return { isPending: true };
    case updateUser.SUCCESS:
      return { data: action.payload };
    case updateUser.FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
};

const deleteUserReducer = (state = [], action) => {
  switch (action.type) {
    case deleteUser.REQUEST:
      return { isPending: true };
    case deleteUser.SUCCESS:
      return { data: action.payload };
    case deleteUser.FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
};

export const userReducer = combineReducers({
  register: registerReducer,
  fetch: fetchUsersReducer,
  delete: deleteUserReducer,
  update: updateUserReducer
});
