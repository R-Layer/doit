import React, { Component } from "react";

import "./projectForm.scss";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalsList: []
    };
  }

  appendGoal = e => {
    e.preventDefault();
    const goalValue = e.target.previousElementSibling.value;
    const goalKey = Date.now();
    this.setState(prevState => ({
      goalsList: [...prevState.goalsList, { value: goalValue, key: goalKey }]
    }));
    e.target.previousElementSibling.value = "";
  };

  removeGoal = e => {
    e.preventDefault();
    const elToRemove = parseInt(e.target.closest("li").id);
    this.setState(
      prevState => ({
        goalsList: prevState.goalsList.filter(goal => {
          return goal.key !== elToRemove;
        })
      }),
      console.log(this.state.goalsList)
    );
  };

  render() {
    return (
      <form className="form-horizontal">
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
              placeholder="Name"
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
              placeholder="Brief description of the project"
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
            <ul id="project-goals" className="dynamic-list">
              <li>
                <div className="input-group">
                  <input type="text" className="form-input" />
                  <button
                    className="btn btn-primary input-group-btn"
                    onClick={this.appendGoal}
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
                  />
                  {goal.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    );
  }
}

export default ProjectForm;
