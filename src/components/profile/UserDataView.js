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
      isEditing: false,
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
  componentDidMount() {
    if (this.props.user && this.state.user.username === "")
      this.setState({
        user: this.props.user.data.user
      });
  }
  componentDidUpdate() {
    if (this.props.user && this.state.user.username === "")
      this.setState({
        user: this.props.user.data.user
      });
  }

  toggleEdit = e => {
    this.setState({
      isEditing: this.state.isEditing ? false : e.currentTarget.id
    });
  };

  handleChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      }
    });
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
    let rowID = parseInt(e.target.closest("tr").id, 10);
    if (e.target.nodeName === "BUTTON") {
      switch (e.currentTarget.id) {
        case "timespan_table":
          this.setState(
            prevState => ({
              user: {
                ...prevState.user,
                timezones: [
                  ...prevState.user.timezones.filter(tmz => tmz.key !== rowID)
                ]
              },
              activeModal: null
            }),
            () =>
              this.props.updateSelf({ timezones: this.state.user.timezones })
          );
          break;
        case "contact_table":
          this.setState(
            prevState => ({
              user: {
                ...prevState.user,
                contacts: [
                  ...prevState.user.contacts.filter(
                    contact => contact.key !== rowID
                  )
                ]
              },
              activeModal: null
            }),
            () => this.props.updateSelf({ contacts: this.state.user.contacts })
          );
          break;
        default:
          break;
      }
    }
  };

  openModal = e => {
    this.setState({
      activeModal: e.target.id
    });
  };

  collectModalData = modalForm => {
    const modalDataObj = {};
    const modalFieldsData = new FormData(modalForm);
    for (let entry of modalFieldsData.entries()) {
      if (modalDataObj.hasOwnProperty(entry[0])) {
        Array.isArray(modalDataObj[entry[0]])
          ? modalDataObj[entry[0]].push(entry[1])
          : (modalDataObj[entry[0]] = [modalDataObj[entry[0]], entry[1]]);
      } else {
        modalDataObj[entry[0]] = entry[1];
      }
    }
    return modalDataObj;
  };

  insertModalData = e => {
    e.preventDefault();
    let modalData = this.collectModalData(e.target);
    switch (this.state.activeModal) {
      case "add_contact":
        this.setState(
          prevState => ({
            user: {
              ...prevState.user,
              contacts: [
                ...prevState.user.contacts,
                { value: modalData.contact, key: Date.now() }
              ]
            },
            activeModal: null
          }),
          () => this.props.updateSelf({ contacts: this.state.user.contacts })
        );
        break;
      case "add_timespan":
        this.setState(
          prevState => ({
            user: {
              ...prevState.user,
              timezones: [
                ...prevState.user.timezones,
                { ...modalData, key: Date.now() }
              ]
            },
            activeModal: null
          }),
          () => this.props.updateSelf({ timezones: this.state.user.timezones })
        );
        break;
      case "password_change":
        this.setState({
          activeModal: null
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { isMobile, activeModal, user } = this.state;
    let editable = this.state.isEditing;
    return (
      <div>
        <div className="row">
          <div className="container">
            <div className="columns">
              <div className="column col-4 col-sm-12">
                <div className="update-element">
                  <input
                    type="text"
                    id="username"
                    className="update-field"
                    onChange={this.handleChange}
                    value={user.username}
                    disabled={!(editable === "username_edit")}
                  />
                  <i
                    className="icon icon-edit"
                    onClick={this.toggleEdit}
                    id="username_edit"
                  />
                </div>
              </div>
              <div className="column col-4 col-sm-12">
                <div className="update-element">
                  <input
                    type="text"
                    id="email"
                    className="update-field"
                    onChange={this.handleChange}
                    value={user.email}
                    disabled={!(editable === "email_edit")}
                  />
                  <i
                    className="icon icon-edit"
                    onClick={this.toggleEdit}
                    id="email_edit"
                  />
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
                  <table onClick={this.deleteRow} id="timespan_table">
                    <thead>
                      <tr>
                        <th>Time availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.timezones.map(tmz => (
                        <tr key={tmz.key} id={tmz.key}>
                          <td>
                            {tmz.timezone.match(/[-+]\d{2}:\d{2}/)}
                            <br />
                            {tmz.fromTime} / {tmz.toTime}
                            <br />
                            {tmz.days}
                          </td>
                          <td>
                            <button>&times;</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table onClick={this.deleteRow} id="timespan_table">
                    <thead>
                      <tr>
                        <th>Timezone</th>
                        <th>Timespan</th>
                        <th>Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.timezones.map(tmz => (
                        <tr key={tmz.key} id={tmz.key}>
                          <td>{tmz.timezone.match(/[-+]\d{2}:\d{2}/)}</td>
                          <td>
                            {tmz.fromTime} / {tmz.toTime}
                          </td>
                          <td>{tmz.days}</td>
                          <td>
                            <button>&times;</button>
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
                <table onClick={this.deleteRow} id="contact_table">
                  <thead>
                    <tr>
                      <th>My Contacts </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.contacts.map(contact => (
                      <tr key={contact.key} id={contact.key}>
                        <td>{contact.value}</td>
                        <td />
                        <td />
                        <td>
                          <button>&times;</button>
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
