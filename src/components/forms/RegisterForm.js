import React, { Component } from "react";

import "./forms.scss";

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
      timezones: [],
      timezone: "Choose your timezone [credits to dmfilipenko]",
      fromTime: "00:00",
      toTime: "23:59",
      days: [],
      avatar: null,
      contact: "",
      contacts: [],
      matchPwd: true,
      isTimeValid: true
    };
    this.previewRef = React.createRef();
    this.ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/bmp"];
  }

  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      timezones: this.state.timezones,
      avatar: this.state.avatar,
      contacts: this.state.contacts
    };
    if (this.state.isTimeValid) {
      this.props.register(userData, this.props.history);
    }
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

    if (
      this.props.registrationStatus.fail &&
      this.props.registrationStatus.fail.days
    ) {
      delete this.props.registrationStatus.fail.days;
    }
  };

  /* On blur and on focus password and confirm field 
  will trigger this method */
  comparePasswords = () => {
    this.setState({
      matchPwd: this.state.password === this.state.confirm
    });
  };

  checkTimes = e => {
    let hourPattern = /[0-2][0-9]:/;
    let minutePattern = /:[0-5][0-9]/;

    this.setState({
      isTimeValid:
        hourPattern.test(e.target.value) && minutePattern.test(e.target.value)
    });
  };

  addTimespan = () => {
    const daysFormat = this.state.days.map(
      (el, i) => ` ${el}${i === this.state.days.length - 1 ? "" : ","}`
    );

    const newTimezone = {
      timezone: this.state.timezone,
      fromTime: this.state.fromTime,
      toTime: this.state.toTime,
      days: daysFormat,
      key: Date.now()
    };

    this.setState(prevState => ({
      timezones: [...prevState.timezones, newTimezone],
      fromTime: "00:00",
      toTime: "23:59",
      days: []
    }));
  };

  removeTimespan = e => {
    let ID_toremove = parseInt(e.currentTarget.id);
    this.setState(prevState => ({
      timezones: prevState.timezones.filter(tmz => tmz.key !== ID_toremove)
    }));
  };

  /* Method to append and remove the list elements
     ( contacts here) */

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

  /* Create and load a preview of the chosen image  */
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

  deleteError = e => {
    if (e.target.id === "password") {
      this.setState({ matchPwd: true });
    }
    if (
      this.props.registrationStatus.fail &&
      this.props.registrationStatus.fail.hasOwnProperty(e.target.id)
    ) {
      delete this.props.registrationStatus.fail[e.target.id];
      this.forceUpdate();
    }
  };

  render() {
    const { fail } = this.props.registrationStatus;
    return (
      <form className="form-horizontal form-card" onSubmit={this.handleSubmit}>
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
                onFocus={this.deleteError}
              />
              {fail &&
                fail.username &&
                fail.username.map((msg, i) => (
                  <span key={i}>
                    <small className="form-input-hint text-error">{msg}</small>
                    <div className="divider" />
                  </span>
                ))}
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
                onFocus={this.deleteError}
              />
              {fail &&
                fail.email &&
                fail.email.map((msg, i) => (
                  <span key={i}>
                    <small className="form-input-hint text-error">{msg}</small>
                    <div className="divider" />
                  </span>
                ))}
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
                onFocus={this.deleteError}
                onBlur={this.comparePasswords}
              />
              {fail &&
                fail.password &&
                fail.password.map((msg, i) => (
                  <span key={i}>
                    <small className="form-input-hint text-error">{msg}</small>
                    <div className="divider" />
                  </span>
                ))}
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
                required
              >
                <option disabled hidden>
                  Choose your timezone [credits to dmfilipenko]
                </option>
                {timezones.map(timezone => (
                  <option key={timezone.text} id={timezone.text}>
                    {timezone.text}
                  </option>
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
                      id="fromTime"
                      value={this.state.fromTime}
                      onChange={this.handleChange}
                      onFocus={this.deleteError}
                      onBlur={this.checkTimes}
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
                      id="toTime"
                      value={this.state.toTime}
                      onChange={this.handleChange}
                      onFocus={this.deleteError}
                      onBlur={this.checkTimes}
                    />
                    <span className="input-group-addon">
                      <small>UTC</small>
                    </span>
                  </div>
                </div>
                {!this.state.isTimeValid && (
                  <div className="form-input-hint text-error">
                    Please insert valid times
                  </div>
                )}
              </div>
              <div className="columns column col-6 col-xs-12">
                <fieldset
                  className="column col-12  checkbox-group"
                  onChange={this.handleCheck}
                >
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      name="days"
                      id="mon"
                      checked={this.state.days.includes("mon")}
                      onChange={() => this.handleCheck}
                    />
                    <i className="form-icon" /> mon
                  </label>
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      name="days"
                      id="tue"
                      checked={this.state.days.includes("tue")}
                      onChange={() => this.handleCheck}
                    />
                    <i className="form-icon" /> tue
                  </label>
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      name="days"
                      id="wed"
                      checked={this.state.days.includes("wed")}
                      onChange={() => this.handleCheck}
                    />
                    <i className="form-icon" /> wed
                  </label>
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      name="days"
                      id="thu"
                      checked={this.state.days.includes("thu")}
                      onChange={() => this.handleCheck}
                    />
                    <i className="form-icon" /> thu
                  </label>
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      name="days"
                      id="fri"
                      checked={this.state.days.includes("fri")}
                      onChange={() => this.handleCheck}
                    />
                    <i className="form-icon" /> fri
                  </label>
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      name="days"
                      id="sat"
                      checked={this.state.days.includes("sat")}
                      onChange={() => this.handleCheck}
                    />
                    <i className="form-icon" /> sat
                  </label>
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      name="days"
                      id="sun"
                      checked={this.state.days.includes("sun")}
                      onChange={() => this.handleCheck}
                    />
                    <i className="form-icon" /> sun
                  </label>
                </fieldset>{" "}
                {fail &&
                  fail.days &&
                  fail.days.map((msg, i) => (
                    <span key={i}>
                      <small className="form-input-hint text-error">
                        {msg}
                      </small>
                      <div className="divider" />
                    </span>
                  ))}
              </div>
            </div>
            <button
              className="btn btn-success btn-action s-circle"
              type="button"
              onClick={this.addTimespan}
            >
              <i className="icon icon-check" />
            </button>
            <section className="column col-12">
              {this.state.timezones.map(tmz => (
                <div
                  className="time-row"
                  key={tmz.key}
                  id={tmz.key}
                  onClick={this.removeTimespan}
                >
                  <span>{tmz.timezone.match(/[-+]\d{2}:\d{2}/)}</span>
                  <span>
                    {tmz.fromTime} / {tmz.toTime}
                  </span>
                  <span>{tmz.days}</span>
                  <button className="btn btn-error btn-action " type="button">
                    <i className="icon icon-cross" />
                  </button>
                </div>
              ))}
            </section>
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
              <span className="form-input-hint text-dark">Max-size: 2MB</span>
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
