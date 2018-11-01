import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import ProjectForm from "../components/projectForm/ProjectForm";
import LoginForm from "../components/loginForm/LoginForm";
import RegisterForm from "../components/registerForm/RegisterForm";
import ShrinkableList from "../components/shrinkableList/ShrinkableList";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <ShrinkableList
                    listStatus={this.props.listStatus}
                    fetchList={this.props.fetchList}
                    setActive={this.props.setActive}
                    setFilter={this.props.setFilter}
                  />
                )}
              />
              <Route path="/create-form" render={() => <ProjectForm />} />
              <Route
                path="/register"
                render={() => <RegisterForm register={this.props.register} />}
              />
              <Route
                path="/login"
                render={() => <LoginForm login={this.props.login} />}
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
