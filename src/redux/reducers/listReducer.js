import { fetchListItems, SET_ACTIVE_ITEM, SET_FILTER_STRING } from "../types";

const initState = {
  listElements: [],
  filterString: "",
  activeItem: null
};

export const listReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return { ...state, activeItem: action.payload };
    case SET_FILTER_STRING:
      return { ...state, filterString: action.payload };
    case fetchListItems.SUCCESS:
      return { ...state, listElements: action.payload };
    default:
      return state;
  }
};
