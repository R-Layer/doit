import { LOAD_USER } from "../types";

const initState = {
  users: []
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return action.payload;
    default:
      return state;
  }
};
