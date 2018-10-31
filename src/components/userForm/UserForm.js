import React, { Component } from "react";

import "./userForm.scss";
import { timezones } from "../../redux/timezones.js";
// Timezones credits to dmfilipenko

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysValue: []
    };
  }

  handleChange = e => {
    console.log(e.target.value);
  };

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-section columns">
          <div className="col-2  col-sm-12">
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>
          <div className="col-4 col-sm-12">
            <input className="form-input" id="username" />
          </div>
          <div className="col-2  col-sm-12">
            <label className="form-label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="col-4 col-sm-12">
            <input className="form-input" id="email" />
          </div>
        </div>
        <div className="form-section">
          <div className="form-group">
            <div className="col-2  col-sm-12">
              <label className="form-label" htmlFor="project-name">
                Timezone
              </label>
            </div>
            <div className="col-10 col-sm-12">
              <select className="form-select">
                <option>Choose your timezone [credits to dmfilipenko]</option>
                {timezones.map(timezone => (
                  <option key={timezone.text}>{timezone.text}</option>
                ))}
              </select>
            </div>
            <div className="columns col-12">
              <div className="columns column col-6 col-xs-12">
                <div className="column col-4">
                  <label className="form-label" htmlFor="project-description">
                    From
                  </label>
                </div>
                <div className="column col-6 col-md-8">
                  <div className="input-group">
                    <input type="time" className="form-input" />
                    <span className="input-group-addon">
                      <small>UTC</small>
                    </span>
                  </div>
                </div>
                <div className="column col-4">
                  <label className="form-label" htmlFor="project-description">
                    To
                  </label>
                </div>
                <div className="column col-6 col-md-8">
                  <div className=" input-group">
                    <input type="time" className="form-input" />
                    <span className="input-group-addon">
                      <small>UTC</small>
                    </span>
                  </div>
                </div>
              </div>
              <div className="columns column col-6 col-xs-12">
                <div className="column col-12  checkbox-group">
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" />
                    <i className="form-icon" /> mon
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" />
                    <i className="form-icon" /> tue
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" />
                    <i className="form-icon" /> wed
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" />
                    <i className="form-icon" /> thu
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" />
                    <i className="form-icon" /> fri
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" />
                    <i className="form-icon" /> sat
                  </label>
                  <label className="form-checkbox form-inline">
                    <input type="checkbox" />
                    <i className="form-icon" /> sun
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-section columns">
          <div className="col-2 col-sm-12">
            <label className="form-label" htmlFor="project-goals">
              Contacts:
            </label>
          </div>
          <div className="col-10 col-sm-12">
            <ul id="project-goals-list" className="dynamic-list">
              <li>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-input"
                    id="project-goal"
                    value={this.state["project-goal"]}
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-primary input-group-btn"
                    onClick={this.appendGoal}
                    disabled={this.state["project-goal"] === ""}
                  >
                    Add contact
                  </button>
                </div>
              </li>
              {this.state.daysValue.map(goal => (
                <li
                  key={goal.key}
                  id={goal.key}
                  className="toast toast-primary"
                >
                  <button
                    className="btn btn-clear float-right"
                    onClick={this.removeGoal}
                    type="button"
                  />
                  {goal.value}
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

export default UserForm;
