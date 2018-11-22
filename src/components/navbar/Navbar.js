import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

class Navbar extends Component {
  render() {
    let avtPath = "./placeholder";
    let usrName = "Jhon Smith";
    if (this.props.user.data) {
      avtPath = this.props.user.data.user.avatarPath || "./placeholder";
      usrName = this.props.user.data.user.username || "Jhon Smith";
    }
    return (
      <nav className="navbar">
        <section className="navbar-section">
          <NavLink exact to="/">
            Home
          </NavLink>
          {this.props.authStatus.loggedIn && (
            <>
              <NavLink to="/create-form">New Form</NavLink>
            </>
          )}
        </section>
        <section className="navbar-center" />
        <section className="navbar-section">
          {!this.props.authStatus.loggedIn ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">SignUp</NavLink>
            </>
          ) : (
            <>
              {this.props.user.isPending ? (
                <div className="loading" />
              ) : (
                <>
                  <NavLink to="/profile">
                    <figure className="avatar">
                      <img src={avtPath} alt="usr" />
                    </figure>
                  </NavLink>
                  <span className="text-gray">{usrName}</span>
                </>
              )}
              <NavLink to="/login" onClick={() => this.props.logout()}>
                Logout
              </NavLink>
            </>
          )}
        </section>
      </nav>
    );
  }
}

export default Navbar;
