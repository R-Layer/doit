import React from "react";

import { timezones } from "../../redux/timezones.js";
// Timezones credits to dmfilipenko

const fail = "";

export const ChangePassword = ({ errors }) => {
  return (
    <div className="columns">
      <div className="col-5  col-sm-12">
        <label className="form-label" htmlFor="old_password">
          Old Password
        </label>
      </div>
      <div className="col-7 col-sm-12">
        <input
          type="password"
          className="form-input"
          id="old_password"
          name="old_password"
        />
        {errors &&
          errors.old_password &&
          errors.old_password.map((msg, i) => (
            <span key={i}>
              <small className="form-input-hint text-error">{msg}</small>
              <div className="divider" />
            </span>
          ))}
      </div>
      <div className="col-5  col-sm-12">
        <label className="form-label" htmlFor="new_password">
          New Password
        </label>
      </div>
      <div className="col-7 col-sm-12">
        <input
          type="password"
          className="form-input"
          id="new_password"
          name="new_password"
        />{" "}
        {errors &&
          errors.new_password &&
          errors.new_password.map((msg, i) => (
            <span key={i}>
              <small className="form-input-hint text-error">{msg}</small>
              <div className="divider" />
            </span>
          ))}
      </div>
      <div className="col-5  col-sm-12">
        <label className="form-label" htmlFor="confirm_password">
          Confirm New Password
        </label>
      </div>
      <div className="col-7 col-sm-12">
        <input
          type="password"
          className="form-input"
          id="confirm_password"
          name="confirm_password"
        />
        {errors &&
          errors.confirm_password &&
          errors.confirm_password.map((msg, i) => (
            <span key={i}>
              <small className="form-input-hint text-error">{msg}</small>
              <div className="divider" />
            </span>
          ))}
      </div>
    </div>
  );
};

export const AddTimespan = () => {
  return (
    <div>
      {" "}
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
              id="timezone"
              name="timezone"
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
            <div className="columns column col-6 col-sm-12">
              <div className="column col-6">
                <label className="form-label" htmlFor="fromTime">
                  From
                </label>
              </div>
              <div className="column col-6">
                <div className="input-group">
                  <input
                    type="time"
                    className="form-input"
                    id="fromTime"
                    name="fromTime"
                  />
                </div>
              </div>
              <div className="column col-6">
                <label className="form-label" htmlFor="toTime">
                  To
                </label>
              </div>
              <div className="column col-6">
                <div className=" input-group">
                  <input
                    type="time"
                    className="form-input"
                    id="toTime"
                    name="toTime"
                  />
                </div>
              </div>
            </div>
            <div className="columns column col-6 col-sm-12">
              <fieldset className="column col-12  checkbox-group">
                <label className="form-checkbox form-inline">
                  <input type="checkbox" name="days" id="mon" value="mon" />
                  <i className="form-icon" /> mon
                </label>
                <label className="form-checkbox form-inline">
                  <input type="checkbox" name="days" id="tue" value="tue" />
                  <i className="form-icon" /> tue
                </label>
                <label className="form-checkbox form-inline">
                  <input type="checkbox" name="days" id="wed" value="wed" />
                  <i className="form-icon" /> wed
                </label>
                <label className="form-checkbox form-inline">
                  <input type="checkbox" name="days" id="thu" value="thu" />
                  <i className="form-icon" /> thu
                </label>
                <label className="form-checkbox form-inline">
                  <input type="checkbox" name="days" id="fri" value="fri" />
                  <i className="form-icon" /> fri
                </label>
                <label className="form-checkbox form-inline">
                  <input type="checkbox" name="days" id="sat" value="sat" />
                  <i className="form-icon" /> sat
                </label>
                <label className="form-checkbox form-inline">
                  <input type="checkbox" name="days" id="sun" value="sun" />
                  <i className="form-icon" /> sun
                </label>
              </fieldset>{" "}
              {fail &&
                fail.days &&
                fail.days.map((msg, i) => (
                  <span key={i}>
                    <small className="form-input-hint text-error">{msg}</small>
                    <div className="divider" />
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddContactSnippet = () => {
  return <input type="text" id="contact" name="contact" />;
};
