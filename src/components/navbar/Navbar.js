import React, { Component } from "react";

import "./navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <section className="navbar-section" />
        <section className="navbar-center" />
        <section className="navbar-section">{this.props.children}</section>
      </nav>
    );
  }
}

export default Navbar;
