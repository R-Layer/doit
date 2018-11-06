import { loginProcess } from "../types";

const initState = {
  listElements: [],
  filterString: "",
  activeItem: null
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case loginProcess.REQUEST:
      return state;
    case loginProcess.SUCCESS:
      console.log("login data: ", action.payload);
      return state;
    case loginProcess.FAILURE:
      return state;
    default:
      return state;
  }
};
