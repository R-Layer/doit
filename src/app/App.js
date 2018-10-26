import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import ProjectForm from "../components/projectForm/ProjectForm";
import ShrinkableList from "../containers/ShrinkableList";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <header>
            <Navbar>
              <Link to="/">Home</Link>
              <Link to="/create-form">New Form</Link>
            </Navbar>
          </header>
          <main>
            <Route path="/" exact component={ShrinkableList} />
            <Route path="/create-form" exact component={ProjectForm} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
