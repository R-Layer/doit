import React, { Component } from "react";
import "./detailPanel.scss";

class DetailPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPane: "description"
    };
  }

  changePane = e => {
    this.setState({
      mainPane: e.target.id
    });
  };

  render() {
    const { project, mobile } = this.props;
    return (
      <section className={`detail-panel ${mobile ? "mobile" : ""}`}>
        {!mobile && (
          <>
            {" "}
            <div className="panel-header text-center">
              <div className="panel-title h5 mt-10">
                {project["project-title"]}
              </div>
              <div className="panel-subtitle">
                <small>from {project.author}</small>
              </div>
            </div>
            <nav className="panel-nav">
              <ul className="tab tab-block">
                <li className="tab-item active">
                  <div
                    className="tab-fake-link"
                    onClick={this.changePane}
                    id="description"
                  >
                    Description
                  </div>
                </li>
                <li className="tab-item">
                  <div
                    className="tab-fake-link"
                    onClick={this.changePane}
                    id="roles"
                  >
                    Roles
                  </div>
                </li>
              </ul>
            </nav>
          </>
        )}
        <div className="panel-body">
          {this.state.mainPane === "description" ? (
            <>
              <p className="flex-par">{project["project-description"]}</p>
              <span>
                {mobile && (
                  <>
                    <select className="col-12">
                      {project.roleList.map(role => (
                        <option key={role.key}>
                          {`${role.value.expertise} ${role.value.role}`}
                        </option>
                      ))}
                    </select>
                    <button className="col-12">
                      <i className="icon icon-check" />
                      <small>Apply </small>
                    </button>
                  </>
                )}
              </span>
            </>
          ) : (
            <ul className="flex-list container">
              {project.roleList.map(role => (
                <li key={role.key} className="columns">
                  <button className="column col-4">
                    <i className="icon icon-check" />
                    <br />
                    <small>Apply for the role</small>
                  </button>
                  <div className="column col-8">
                    <h6>
                      {` N° ${role.value.quantity} ${role.value.expertise} ${
                        role.value.role
                      }`}
                    </h6>
                    <small>{role.value.description}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel-footer">
          <span>Expires: </span>
          {project.fulfillOrDelete}
        </div>
      </section>
    );
  }
}
export default DetailPanel;
