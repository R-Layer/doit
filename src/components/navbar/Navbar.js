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
          <NavLink to="/create-form">New Form</NavLink>
        </section>
        <section className="navbar-center" />
        <section className="navbar-section">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">SignUp</NavLink>
        </section>
      </nav>
    );
  }
}

export default Navbar;
