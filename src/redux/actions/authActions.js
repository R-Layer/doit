import { loginProcess, registerProcess, LOAD_USER } from "../types";

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
  const formData = new FormData();
  for (let data in registerData) {
    formData.append(data, registerData[data]);
  }

  const fetchOptions = {
    method: "POST",
    body: formData
  };

  fetch("/user/register", fetchOptions)
    .then(res => res.json())
    .then(res => console.log("response!", res))
    .catch(err => console.error("err!", err));

  return dispatch({ type: registerProcess.SUCCESS, payload: registerData });
};

export const loadUser = () => dispatch => {
  console.log("fetching");
  fetch("/user/get-all")
    .then(res => res.json())
    .then(res => dispatch({ type: LOAD_USER, payload: res }))
    .catch(err => console.error("Error!", err));
};
