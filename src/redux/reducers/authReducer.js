import { loginProcess, LOGOUT } from "../types";

const initState = {
  isPending: false,
  loggedIn: false,
  user: null,
  error: null
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case loginProcess.REQUEST:
      return { ...state, isPending: true };
    case loginProcess.SUCCESS:
      return {
        ...state,
        isPending: false,
        loggedIn: true,
        user: action.payload
      };
    case loginProcess.FAILURE:
      return {
        ...state,
        isPending: false,
        loggedIn: false,
        error: action.payload
      };
    case LOGOUT:
      return { loggedIn: false };
    default:
      return state;
  }
};
