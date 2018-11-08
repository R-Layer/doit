import { loginProcess, LOGOUT } from "../types";
import jwt_decode from "jwt-decode";

export const loginAction = (loginData, history, token = null) => dispatch => {
  if (token) {
    try {
      let rawData = jwt_decode(token);

      rawData.exp > Date.now()
        ? dispatch({ type: LOGOUT })
        : dispatch({ type: loginProcess.SUCCESS, payload: rawData });
    } catch (err) {
      console.log(err);
    }
  } else {
    dispatch({ type: loginProcess.REQUEST });

    let fetchOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(loginData)
    };

    return fetch("/auth/login", fetchOptions)
      .then(res => res.json())
      .then(loginResult => {
        if (loginResult.fail) {
          dispatch({ type: loginProcess.FAILURE, payload: loginResult.fail });
        } else {
          localStorage.setItem("userToken", loginResult.auth);
          history.push("/");
          try {
            let rawData = jwt_decode(loginResult.auth);
            dispatch({
              type: loginProcess.SUCCESS,
              payload: rawData
            });
          } catch (err) {
            console.log(err);
          }
        }
      })
      .catch(err => dispatch({ type: loginProcess.FAILURE, payload: err }));
  }
};

export const logoutAction = () => dispatch => {
  localStorage.removeItem("userToken");
  dispatch({ type: LOGOUT });
};
