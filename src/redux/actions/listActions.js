import { fetchListItems, SET_ACTIVE_ITEM, SET_FILTER_STRING } from "../types";

import { projects } from "../testList";

export const fetchList = () => dispatch => {
  return dispatch({ type: fetchListItems.SUCCESS, payload: projects });
};

export const setFilterString = filter => dispatch =>
  dispatch({
    type: SET_FILTER_STRING,
    payload: filter
  });

export const setActiveItem = id => dispatch => {
  return dispatch({ type: SET_ACTIVE_ITEM, payload: id });
};
