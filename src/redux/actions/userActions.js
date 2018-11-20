import { registerUser, fetchUsers, fetchUser, GENERAL_FAILURE } from "../types";

export const registerAction = (registerData, history) => dispatch => {
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
  // Display the key/value pairs
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  fetch("/user/register", fetchOptions)
    .then(res => res.json())
    .then(res => {
      console.log("res", res);
      if (res.errors) {
        dispatch({ type: registerUser.FAILURE, payload: res.errors });
      } else {
        dispatch({ type: registerUser.SUCCESS, payload: res });
        history.push("/");
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export const loadUsers = () => dispatch => {
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

export const loadSelf = () => dispatch => {
  const fetchOptions = {
    method: "GET",
    headers: { authorization: localStorage.userToken }
  };

  dispatch({ type: fetchUser.REQUEST });
  return fetch("/user/get-self", fetchOptions)
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        dispatch({ type: fetchUser.FAILURE, payload: res.errors });
      } else {
        dispatch({ type: fetchUser.SUCCESS, payload: res });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};
