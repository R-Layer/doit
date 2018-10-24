import React, { Component } from "react";

import Navbar from "../components/navbar/Navbar";
import ShrinkableList from "../containers/ShrinkableList";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Navbar />
        </header>
        <main>
          <ShrinkableList />
        </main>
      </div>
    );
  }
}

export default App;
