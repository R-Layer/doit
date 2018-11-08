import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import "./forms.scss";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    this.props.logout();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  /* Controlled form - input type text-select-number */
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-section ">
            <div className=" columns">
              <div className="col-2  col-sm-12">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="col-4 col-sm-12">
                <input
                  className="form-input"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-2  col-sm-12">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="col-4 col-sm-12">
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <CSSTransition
          in={!!this.props.authStatus.error}
          timeout={800}
          classNames="error-notification"
          unmountOnExit={true}
        >
          <div className="error-notification toast toast-error">
            {this.props.authStatus.error && this.props.authStatus.error.message}
          </div>
        </CSSTransition>
      </>
    );
  }
}

export default LoginForm;
