import React, { Component } from "react";

import UserDataView from "./UserDataView";
import UserActivityView from "./UserActivityView";

import "./profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

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
        {activeTab === 1 ? <UserActivityView /> : <UserDataView />}

        {/*         <div class="modal active" id="modal-id">
          <a href="#close" class="modal-overlay" aria-label="Close" />
          <div class="modal-container">
            <div class="modal-header">
              <a
                href="#close"
                class="btn btn-clear float-right"
                aria-label="Close"
              />
              <div class="modal-title h5">Modal title</div>
            </div>
            <div class="modal-body">
              <div class="content" />
            </div>
            <div class="modal-footer">...</div>
          </div>
        </div> */}
      </>
    );
  }
}

export default Profile;
