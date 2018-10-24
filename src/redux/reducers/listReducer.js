import { fetchListItems, SET_ACTIVE_ITEM } from "../types";

const initState = {
  listElements: []
};

export const listReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return { ...state, activeItem: action.payload };
    case fetchListItems.SUCCESS:
      return { ...state, listElements: action.payload };
    default:
      return state;
  }
};
