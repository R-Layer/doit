import React from "react";

import "./profile.scss";

const UserActivityView = () => {
  return (
    <div className="columns">
      <div className="column col-8 col-mx-auto">
        <details className="accordion" open>
          <summary className="accordion-header">
            <i className="icon icon-arrow-right mr-1" />
            Active Projects
          </summary>
          <div className="accordion-body">
            <ul className="project-overview-list">
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
            </ul>
          </div>
        </details>
        <details className="accordion" open>
          <summary className="accordion-header">
            <i className="icon icon-arrow-right mr-1" />
            Completed Projects
          </summary>
          <div className="accordion-body">
            <ul className="project-overview-list">
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
            </ul>
          </div>
        </details>
        <details className="accordion" open>
          <summary className="accordion-header">
            <i className="icon icon-arrow-right mr-1" />
            Abandoned Projects
          </summary>
          <div className="accordion-body">
            <ul className="project-overview-list">
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
              <div className="divider" />
              <li>
                <span>Project Name</span>
                <span>Code Archive</span>
                <span>Live</span>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

export default UserActivityView;
