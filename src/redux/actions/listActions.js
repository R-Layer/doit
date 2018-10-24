import { fetchListItems, SET_ACTIVE_ITEM } from "../types";

import { list } from "../testList";

export const fetchList = () => dispatch => {
  return dispatch({ type: fetchListItems.SUCCESS, payload: list });
};

export const setActiveItem = id => dispatch => {
  return dispatch({ type: SET_ACTIVE_ITEM, payload: id });
};
