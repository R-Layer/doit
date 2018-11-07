import { registerUser, fetchUsers, GENERAL_FAILURE } from "../types";

export const registerAction = registerData => dispatch => {
  dispatch({ type: registerUser.REQUEST });
  const formData = new FormData();
  for (let data in registerData) {
    Array.isArray(registerData[data])
      ? formData.append(data, JSON.stringify(registerData[data]))
      : formData.append(data, registerData[data]);
  }

  const fetchOptions = {
    method: "POST",
    body: formData
  };

  fetch("/user/register", fetchOptions)
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        dispatch({ type: registerUser.FAILURE, payload: res.errors });
      } else {
        dispatch({ type: registerUser.SUCCESS, payload: res });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export const loadUser = () => dispatch => {
  dispatch({ type: fetchUsers.REQUEST });
  fetch("/user/get-all")
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        dispatch({ type: fetchUsers.FAILURE, payload: res.errors });
      } else {
        dispatch({ type: fetchUsers.SUCCESS, payload: res });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};
