import React, { Component } from "react";

import "./registerForm.scss";
import { timezones } from "../../redux/timezones.js";
// Timezones credits to dmfilipenko

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm: "",
      timezone: "",
      "from-time": "",
      "to-time": "",
      days: [],
      avatar: "",
      contact: "",
      contacts: [],
      matchPwd: true
    };
    this.previewRef = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    const userData = this.state;
    delete userData.confirm;
    delete userData.contact;
    delete userData.matchPwd;

    this.props.register(userData);
  };

  /* Controlled form - input type text-select-number */
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  /* Controlled form - input type checkbox */
  handleCheck = e => {
    let checkedId = e.target.id;
    this.state.days.includes(checkedId)
      ? this.setState(prevState => ({
          days: prevState.days.filter(day => day !== checkedId)
        }))
      : this.setState(prevState => ({
          days: [...prevState.days, checkedId]
        }));
  };

  comparePasswords = () => {
    this.setState({
      matchPwd: this.state.password === this.state.confirm
    });
  };

  appendContact = e => {
    e.preventDefault();
    const contactValue = this.state.contact;
    const contactKey = Date.now();
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { value: contactValue, key: contactKey }
      ],
      contact: ""
    }));
  };

  removeContact = e => {
    e.preventDefault();
    const elToRemove = parseInt(e.target.closest("li").id);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => {
        return contact.key !== elToRemove;
      })
    }));
  };

  previewImage = e => {
    const reader = new FileReader();
    reader.onload = evt => {
      this.previewRef.current.src = evt.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      avatar: e.target.files[0]
    });
  };

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-section ">
          <div className=" columns">
            <div className="col-2  col-sm-12">
              <label className="form-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="col-4 col-sm-12">
              <input
                className="form-input"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-2  col-sm-12">
              <label className="form-label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="col-4 col-sm-12">
              <input
                className="form-input"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="columns" style={{ paddingTop: "1rem" }}>
            <div className="col-2  col-sm-12">
              <label className="form-label" htmlFor="password">
                Password
              </label>
            </div>
            <div className="col-4 col-sm-12">
              <input
                type="password"
                className="form-input"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                onFocus={() => this.setState({ matchPwd: true })}
                onBlur={this.comparePasswords}
              />
            </div>
            <div className="col-2  col-sm-12">
              <label className="form-label" htmlFor="confirm">
                Confirm password
              </label>
            </div>
            <div className="col-4 col-sm-12">
              <input
                className={`form-input ${
                  this.state.matchPwd ? "" : "is-error"
                }`}
                type="password"
                id="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                onFocus={() => this.setState({ matchPwd: true })}
                onBlur={this.comparePasswords}
              />
              {!this.state.matchPwd && (
                <p className="form-input-hint">Password doesn't match</p>
              )}
            </div>
          </div>
        </div>
        <div className="form-section">
          <div className="form-group">
            <div className="col-2  col-sm-12">
              <label className="form-label" htmlFor="timezone">
                Timezone
              </label>
            </div>
            <div className="col-10 col-sm-12">
              <select
                className="form-select"
                onChange={this.handleChange}
                id="timezone"
                value={this.state.timezone}
              >
                <option>Choose your timezone [credits to dmfilipenko]</option>
                {timezones.map(timezone => (
                  <option key={timezone.text}>{timezone.text}</option>
                ))}
              </select>
            </div>
            <div className="columns col-12">
              <div className="columns column col-6 col-xs-12">
                <div className="column col-4">
                  <label className="form-label" htmlFor="from-time">
                    From
                  </label>
                </div>
                <div className="column col-6 col-md-8">
                  <div className="input-group">
                    <input
                      type="time"
                      className="form-input"
                      id="from-time"
                      value={this.state["from-time"]}
                      onChange={this.handleChange}
                    />
                    <span className="input-group-addon">
                      <small>UTC</small>
                    </span>
                  </div>
                </div>
                <div className="column col-4">
                  <label className="form-label" htmlFor="to-time">
                    To
                  </label>
                </div>
                <div className="column col-6 col-md-8">
                  <div className=" input-group">
                    <input
                      type="time"
                      className="form-input"
                      id="to-time"
                      value={this.state["to-time"]}
                      onChange={this.handleChange}
                    />
                    <span className="input-group-addon">
                      <small>UTC</small>
                    </span>
                  </div>
                </div>
              </div>
              <div className="columns column col-6 col-xs-12">
                <fieldset
                  className="column col-12  checkbox-group"
                  onChange={this.handleCheck}
                >
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" name="days" id="mon" />
                    <i className="form-icon" /> mon
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" name="days" id="tue" />
                    <i className="form-icon" /> tue
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" name="days" id="wed" />
                    <i className="form-icon" /> wed
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" name="days" id="thu" />
                    <i className="form-icon" /> thu
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" name="days" id="fri" />
                    <i className="form-icon" /> fri
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" name="days" id="sat" />
                    <i className="form-icon" /> sat
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" name="days" id="sun" />
                    <i className="form-icon" /> sun
                  </label>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="form-section columns">
          <div className="col-4 col-sm-12">
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
            </figure>
          </div>
          <div className="col-2 col-sm-12">
            <label className="form-label" htmlFor="contacts" />
          </div>
          <div className="col-6 col-sm-12">
            <ul id="contacts" className="dynamic-list">
              <li>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-input"
                    id="contact"
                    placeholder="www.my-site.com"
                    value={this.state.contact}
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-primary input-group-btn"
                    onClick={this.appendContact}
                    disabled={this.state.contact === ""}
                  >
                    Add contact
                  </button>
                </div>
              </li>
              {this.state.contacts.map(contact => (
                <li
                  key={contact.key}
                  id={contact.key}
                  className="toast toast-primary"
                >
                  <button
                    className="btn btn-clear float-right"
                    onClick={this.removeContact}
                    type="button"
                  />
                  {contact.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    );
  }
}

export default RegisterForm;
