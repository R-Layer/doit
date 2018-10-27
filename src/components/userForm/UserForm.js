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
        <div className="form-section">
          <div className="form-group">
            <div className="col-2 col-md-4 col-sm-12">
              <label className="form-label" htmlFor="project-name">
                Timezone
              </label>
            </div>
            <div className="col-4 col-md-8 col-sm-12">
              <select className="form-select">
                <option>Choose your timezone [credits to dmfilipenko]</option>
                {timezones.map(timezone => (
                  <option key={timezone.text}>{timezone.text}</option>
                ))}
              </select>
            </div>
            <div className="columns col-12">
              <div className="columns column col-6 col-xs-12">
                <div className="column col-2 col-md-4">
                  <label className="form-label" htmlFor="project-description">
                    From
                  </label>
                </div>
                <div className="column col-4 col-md-8">
                  <div className="input-group">
                    <input type="time" className="form-input" />
                    <span className="input-group-addon">
                      <small>UTC</small>
                    </span>
                  </div>
                </div>
                <div className="column col-2 col-md-4">
                  <label className="form-label" htmlFor="project-description">
                    To
                  </label>
                </div>
                <div className="column col-4 col-md-8">
                  <div className=" input-group">
                    <input type="time" className="form-input" />
                    <span className="input-group-addon">
                      <small>UTC</small>
                    </span>
                  </div>
                </div>
              </div>
              <div className="columns column col-6 col-xs-12">
                <div
                  className="column col-12 radio-group"
                  onChange={this.handleChange}
                >
                  <label className="form-radio form-inline">
                    <input type="radio" name="days" value="weekend" />
                    <i className="form-icon" /> weekend
                  </label>
                  <label className="form-radio form-inline">
                    <input type="radio" name="days" value="business" />
                    <i className="form-icon" /> business days
                  </label>
                  <label className="form-radio form-inline">
                    <input type="radio" name="days" value="other" />
                    <i className="form-icon" /> other
                  </label>
                </div>
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
      </form>
    );
  }
}

export default UserForm;
