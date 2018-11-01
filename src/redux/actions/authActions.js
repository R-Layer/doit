import { loginProcess, registerProcess } from "../types";

export const loginAction = loginData => dispatch => {
  dispatch({ type: loginProcess.REQUEST });

  /* fake auth */
  let i = 0;
  while (i < 100000) {
    i++;
  }
  /* --- */

  return dispatch({ type: loginProcess.SUCCESS, payload: loginData });
};

export const registerAction = registerData => dispatch => {
  dispatch({ type: registerProcess.REQUEST });

  /* fake register */
  let i = 0;
  while (i < 100000) {
    i++;
  }
  /* --- */

  return dispatch({ type: registerProcess.SUCCESS, payload: registerData });
};
