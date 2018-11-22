import React, { Component } from "react";

import UserDataView from "./UserDataView";
import UserActivityView from "./UserActivityView";

import "./profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      user: null
    };
  }

  componentDidMount() {
    this.props.loadSelf().then(() => this.setState({ user: this.props.user }));
  }

  reloadUser = () => {
    this.props.loadSelf().then(() => this.setState({ user: this.props.user }));
  };

  switchTab = e => {
    e.preventDefault();
    this.setState({
      activeTab: Array.prototype.indexOf.call(
        e.currentTarget.children,
        e.target.closest("li")
      )
    });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <div className="row">
          <ul className="tab tab-block" onClick={this.switchTab}>
            <li className={`tab-item ${activeTab === 0 ? "active" : ""}`}>
              <a href="/update">My Data</a>
            </li>
            <li className={`tab-item ${activeTab === 1 ? "active" : ""}`}>
              <a href="/update">My History</a>
            </li>
          </ul>
        </div>
        {activeTab === 1 ? (
          <UserActivityView />
        ) : (
          <UserDataView
            user={this.state.user}
            reloadUser={this.reloadUser}
            updateSelf={this.props.updateSelf}
            updatePwdSelf={this.props.updatePwdSelf}
            updateUserStatus={this.props.updateUserStatus}
          />
        )}
      </>
    );
  }
}

export default Profile;
