import React, { Component } from "react";

import { roles } from "../../redux/rolesAvailables";
import "./projectForm.scss";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalsList: [],
      roleList: [],
      "project-name": "",
      "project-description": "",
      "project-goal": "",
      role: "Available roles",
      expertise: "Knowledge level",
      quantity: 1,
      "role-description": ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  appendGoal = e => {
    e.preventDefault();
    const goalValue = this.state["project-goal"];
    const goalKey = Date.now();
    this.setState(prevState => ({
      goalsList: [...prevState.goalsList, { value: goalValue, key: goalKey }],
      "project-goal": ""
    }));
  };

  removeGoal = e => {
    e.preventDefault();
    const elToRemove = parseInt(e.target.closest("li").id);
    this.setState(prevState => ({
      goalsList: prevState.goalsList.filter(goal => {
        return goal.key !== elToRemove;
      })
    }));
  };

  appendRole = e => {
    e.preventDefault();
    const newRole = {
      role: this.state.role,
      expertise: this.state.expertise,
      quantity: this.state.quantity,
      description: this.state["role-description"]
    };

    const roleKey = Date.now();

    this.setState(prevState => ({
      roleList: [...prevState.roleList, { value: newRole, key: roleKey }],
      "role-description": ""
    }));
  };

  removeRole = e => {
    e.preventDefault();
    const elToRemove = parseInt(e.target.closest("li").id);
    this.setState(prevState => ({
      roleList: prevState.roleList.filter(role => {
        return role.key !== elToRemove;
      })
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <div className="col-2 col-sm-12">
              <label className="form-label" htmlFor="project-name">
                Name
              </label>
            </div>
            <div className="col-10 col-sm-12">
              <input
                className="form-input"
                type="text"
                id="project-name"
                value={this.state["project-name"]}
                placeholder="Name"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-2 col-sm-12">
              <label className="form-label" htmlFor="project-description">
                Description
              </label>
            </div>
            <div className="col-10 col-sm-12">
              <textarea
                className="form-input"
                maxLength="300"
                rows="3"
                id="project-description"
                value={this.state["project-description"]}
                placeholder="Brief description of the project"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-2 col-sm-12">
              <label className="form-label" htmlFor="project-goals">
                Project Goals:
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
                      Add goal
                    </button>
                  </div>
                </li>
                {this.state.goalsList.map(goal => (
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
        </div>

        {/* ROLES SECTION  */}

        <div className="form-section">
          <div className="form-group">
            <div className="col-2 col-sm-12">
              <label className="form-label" htmlFor="project-description">
                Role to insert
              </label>
            </div>
            <select
              className="col-4 col-sm-12 form-select"
              id="role"
              value={this.state.role}
              required
              onChange={this.handleChange}
            >
              <option disabled hidden>
                Available roles
              </option>
              {roles.map(role => (
                <option key={role.key} id={role.key}>
                  {role.value}
                </option>
              ))}
            </select>
            <select
              className="col-4 col-sm-12 form-select"
              id="expertise"
              value={this.state.expertise}
              required
              onChange={this.handleChange}
            >
              <option disabled hidden>
                Knowledge level
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
            <input
              className="col-2 col-sm-12 form-input"
              id="quantity"
              type="number"
              min="1"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <div className="col-2 col-sm-12">
              <label className="form-label" htmlFor="project-description">
                Description
              </label>
            </div>
            <div className="col-10 col-sm-12">
              <textarea
                className="form-input"
                maxLength="300"
                rows="3"
                id="role-description"
                value={this.state["role-description"]}
                placeholder="What i'm gonna deal with?"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.appendRole}
            disabled={
              this.state.role === "Available roles" ||
              this.state.expertise === "Knowledge level"
            }
          >
            Add role
          </button>
          <ul className="role-list">
            {this.state.roleList.map(role => (
              <li key={role.key} id={role.key} className="toast">
                <button
                  className="btn btn-clear float-right"
                  onClick={this.removeRole}
                  type="button"
                />
                <h6>{`N° ${role.value.quantity} ${role.value.expertise} ${
                  role.value.role
                }`}</h6>
                <p>{role.value.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    );
  }
}

export default ProjectForm;
