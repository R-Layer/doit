import React, { Component } from "react";

class ProjectForm extends Component {
  render() {
    return (
      <form class="form-horizontal">
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-example-1">
              Name
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              class="form-input"
              type="text"
              id="input-example-1"
              placeholder="Name"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ProjectForm;
