import React, { Component } from "react";

import ModalFormFields from "../ModalFormFields";
import * as modalSnippets from "./ModalSnippets";

import "./profile.scss";

class UserDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      activeModal: null,
      user: {
        username: "",
        email: "",
        contacts: [],
        timezones: [],
        avatarPath: "placeholder.png"
      }
    };

    this.previewRef = React.createRef();
    this.ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/bmp"];
    this.TITLES = {
      password_change: "Change your password",
      add_timespan: "Add timespan",
      add_contact: "Add contact"
    };
  }

  componentDidUpdate() {
    if (this.props.user && this.state.user.username === "")
      this.setState({
        user: this.props.user.data.user
      });
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

  openModal = e => {
    this.setState({
      activeModal: e.target.id
    });
  };

  collectModalData = modalForm => {
    const modalDataObj = {};
    const modalFieldsData = new FormData(modalForm);
    for (let pair of modalFieldsData.entries()) {
      if (modalDataObj.hasOwnProperty(pair[0])) {
        Array.isArray(modalDataObj[pair[0]])
          ? modalDataObj[pair[0]].push(pair[1])
          : (modalDataObj[pair[0]] = [modalDataObj[pair[0]], pair[1]]);
      } else {
        modalDataObj[pair[0]] = pair[1];
      }
    }
    return modalDataObj;
  };

  insertModalData = e => {
    e.preventDefault();
    let test = this.collectModalData(e.target);
    console.log(test);
    console.log(this.state.activeModal);
    this.setState({
      activeModal: null
    });
  };

  render() {
    const { isMobile, activeModal, user } = this.state;
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
                    value={user.username}
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
                    value={user.email}
                  />
                  <i className="icon icon-edit" />
                </div>
              </div>
              <div className="column col-4 col-sm-12">
                <button
                  className="update-button"
                  id="password_change"
                  onClick={this.openModal}
                >
                  Change password
                </button>
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
                      {user.timezones.map(tmz => (
                        <tr key={tmz.key}>
                          <td>
                            {tmz.timezone.match(/[-+]\d{2}:\d{2}/)}
                            <br />
                            {tmz.fromTime} / {tmz.toTime}
                            <br />
                            {tmz.days}
                          </td>
                          <td>
                            <button onClick={this.deleteRow}>&times;</button>
                          </td>
                        </tr>
                      ))}
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
                      {user.timezones.map(tmz => (
                        <tr key={tmz.key}>
                          <td>{tmz.timezone.match(/[-+]\d{2}:\d{2}/)}</td>
                          <td>
                            {tmz.fromTime} / {tmz.toTime}
                          </td>
                          <td>{tmz.days}</td>
                          <td>
                            <button onClick={this.deleteRow}>&times;</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <button
                  className="btn btn-is-primary"
                  id="add_timespan"
                  onClick={this.openModal}
                >
                  Add Timespan
                </button>
                <div className="divider" />
                <table>
                  <thead>
                    <tr>
                      <th>My Contacts </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.contacts.map(contact => (
                      <tr key={contact.key}>
                        <td>{contact.value}</td>
                        <td />
                        <td />
                        <td>
                          <button onClick={this.deleteRow}>&times;</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn btn-is-primary"
                  id="add_contact"
                  onClick={this.openModal}
                >
                  Add Contact
                </button>
              </div>
              <div className="column col-4 col-md-12">
                <figure className="avatar-container">
                  <img
                    ref={this.previewRef}
                    src={user.avatarPath}
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
        <ModalFormFields
          title={this.TITLES[activeModal]}
          isActive={!!activeModal}
          onConfirm={this.insertModalData}
          onClose={() => this.setState({ activeModal: null })}
        >
          {/*    Super-neat trick from https://www.robinwieruch.de
          to make conditional much much readable!
          */}
          {
            {
              password_change: <modalSnippets.ChangePassword />,
              add_timespan: <modalSnippets.AddTimespan />,
              add_contact: <modalSnippets.AddContactSnippet />
            }[activeModal]
          }
        </ModalFormFields>
      </div>
    );
  }
}

export default UserDataView;
