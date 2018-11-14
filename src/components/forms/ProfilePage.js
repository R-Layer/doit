import React, { Component } from "react";

import "./profile-page.scss";

import { timezones } from "../../redux/timezones.js";
// Timezones credits to dmfilipenko

class UserDataTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Username",
      email: "test@test.com",
      isMobile: false
    };

    this.previewRef = React.createRef();
    this.ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/bmp"];
  }

  toggleEdit = e => {
    console.log(e.currentTarget);
  };

  handleChange = e => {
    console.log("change", e.currentTarget);
  };

  previewImage = e => {
    if (
      !this.ALLOWED_IMAGE_TYPES.includes(e.target.files[0].type) ||
      e.target.files[0].size > 2 * 1024 * 1024
    ) {
      e.target.value = null;
      return;
    }
    const reader = new FileReader();
    reader.onload = evt => {
      this.previewRef.current.src = evt.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      avatar: e.target.files[0]
    });
  };

  deleteRow = e => {
    e.target.closest("table").deleteRow(e.target.closest("tr").rowIndex);
  };

  render() {
    const { isMobile } = this.state;
    return (
      <div>
        <div className="row">
          <div className="container">
            <div className="columns">
              <div className="column col-4 col-sm-12">
                <div className="update-element" onClick={this.toggleEdit}>
                  <input
                    type="text"
                    className="update-field"
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                  <i className="icon icon-edit" />
                </div>
              </div>
              <div className="column col-4 col-sm-12">
                <div className="update-element" onClick={this.toggleEdit}>
                  <input
                    type="text"
                    className="update-field"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                  <i className="icon icon-edit" />
                </div>
              </div>
              <div className="column col-4 col-sm-12">
                <button className="update-button">Change password</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="columns">
              <div className="column col-8 col-md-12">
                {isMobile ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Time availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          UTC+6:00
                          <br />
                          8:00 / 11:00
                          <br />
                          Mon, tue, thu
                        </td>
                        <td>
                          <button>&times;</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Timezone</th>
                        <th>Timespan</th>
                        <th>Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>UTC+6:00</td>
                        <td>8:00 / 11:00</td>
                        <td>Mon, tue, thu</td>
                        <td>
                          <button onClick={this.deleteRow}>&times;</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                <button className="btn btn-is-primary">Add Timespan</button>
                <div className="divider" />
                <table>
                  <thead>
                    <tr>
                      <th>My Contacts </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>www.my-contact-1.com</td>
                      <td />
                      <td />
                      <td>
                        <button onClick={this.deleteRow}>&times;</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-is-primary">Add Contact</button>
              </div>
              <div className="column col-4 col-md-12">
                <figure className="avatar-container">
                  <img
                    ref={this.previewRef}
                    src="placeholder.png"
                    alt="preview-avatar"
                    className="img-responsive"
                  />{" "}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept=".jpeg,.png,.bmp "
                    name="avatar"
                    onChange={this.previewImage}
                  />
                  <button
                    className="file-input"
                    type="button"
                    name="avatar"
                    onClick={e => e.target.previousSibling.click()}
                  >
                    Choose your avatar!
                  </button>
                  <span className="form-input-hint text-dark">
                    .jpeg, .png, .bmp
                  </span>
                  <span className="form-input-hint text-dark">
                    Max-size: 2MB
                  </span>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const UserActivityTab = () => {
  return (
    <div className="columns">
      <div className="column col-8 col-mx-auto">
        <details className="accordion" open>
          <summary className="accordion-header">
            <i className="icon icon-arrow-right mr-1" />
            Active Projects
          </summary>
          <div className="accordion-body">
            <ul className="project-overview-list">
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
            </ul>
          </div>
        </details>
        <details className="accordion" open>
          <summary className="accordion-header">
            <i className="icon icon-arrow-right mr-1" />
            Completed Projects
          </summary>
          <div className="accordion-body">
            <ul className="project-overview-list">
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
            </ul>
          </div>
        </details>
        <details className="accordion" open>
          <summary className="accordion-header">
            <i className="icon icon-arrow-right mr-1" />
            Abandoned Projects
          </summary>
          <div className="accordion-body">
            <ul className="project-overview-list">
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

class ProfilePage extends Component {
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
        {activeTab === 1 ? <UserActivityTab /> : <UserDataTab />}

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

export default ProfilePage;
