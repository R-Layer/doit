import React, { Component } from "react";

import "./navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <section className="navbar-section">first sect</section>
        <section className="navbar-center">centr sect</section>
        <section className="navbar-section">{this.props.children}</section>
      </nav>
    );
  }
}

export default Navbar;
