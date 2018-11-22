import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import ProjectForm from "../components/forms/ProjectForm";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import ProfilePage from "../components/forms/ProfilePage";
import Profile from "../components/profile/Profile";
import ShrinkableList from "../components/shrinkableList/ShrinkableList";

import "./App.scss";

class App extends Component {
  componentDidMount() {
    if (localStorage.userToken) {
      this.props.login(null, null, localStorage.userToken);
    }
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          <header>
            <Navbar
              authStatus={this.props.authStatus}
              user={this.props.user}
              logout={this.props.logout}
            />
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
                render={props => (
                  <RegisterForm
                    register={this.props.register}
                    registrationStatus={this.props.registrationStatus}
                    {...props}
                  />
                )}
              />
              <Route
                path="/login"
                render={props => (
                  <LoginForm
                    login={this.props.login}
                    logout={this.props.logout}
                    authStatus={this.props.authStatus}
                    {...props}
                  />
                )}
              />
              <Route
                path="/profile"
                render={() => (
                  <Profile
                    user={this.props.user}
                    loadSelf={this.props.loadSelf}
                    updateSelf={this.props.updateSelf}
                    updatePwdSelf={this.props.updatePwdSelf}
                    updateAvtSelf={this.props.updateAvtSelf}
                    updateUserStatus={this.props.updateUserStatus}
                  />
                )}
              />
              <Route path="/update" render={() => <ProfilePage />} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
