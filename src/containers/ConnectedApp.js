import { connect } from "react-redux";
import {
  fetchList,
  setActiveItem,
  setFilterString
} from "../redux/actions/listActions";

import { loginAction, logoutAction } from "../redux/actions/authActions";
import {
  registerAction,
  loadUsers,
  loadSelf,
  updateSelf
} from "../redux/actions/userActions";

import App from "../app/App";

const mapStateToProps = state => ({
  listStatus: state.list,
  authStatus: state.auth,
  users: state.users.fetch.users,
  user: state.users.fetch.user,
  registrationStatus: state.users.register,
  deleteUserStatus: state.users.delete,
  updateUserStatus: state.users.update
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
  setActive: id => dispatch(setActiveItem(id)),
  setFilter: filter => dispatch(setFilterString(filter)),
  login: (loginData, history, token) =>
    dispatch(loginAction(loginData, history, token)),
  logout: () => dispatch(logoutAction()),
  register: (registerData, history) =>
    dispatch(registerAction(registerData, history)),
  loadUsers: () => dispatch(loadUsers()),
  loadSelf: () => dispatch(loadSelf()),
  updateSelf: userData => dispatch(updateSelf(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
