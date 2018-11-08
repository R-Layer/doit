import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <section className="navbar-section">
          <NavLink exact to="/">
            Home
          </NavLink>
          {this.props.authStatus.loggedIn && (
            <>
              <NavLink to="/create-form">New Form</NavLink>

              <NavLink to="/profile">Profile</NavLink>
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
            <NavLink to="/login" onClick={() => this.props.logout()}>
              Logout
            </NavLink>
          )}
        </section>
      </nav>
    );
  }
}

export default Navbar;
