import { connect } from "react-redux";
import {
  fetchList,
  setActiveItem,
  setFilterString
} from "../redux/actions/listActions";

import { loginAction, registerAction } from "../redux/actions/authActions";

import App from "../app/App";

const mapStateToProps = state => ({
  listStatus: state.list,
  authStatus: state.auth
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
  setActive: id => dispatch(setActiveItem(id)),
  setFilter: filter => dispatch(setFilterString(filter)),
  login: loginData => dispatch(loginAction(loginData)),
  register: registerData => dispatch(registerAction(registerData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
