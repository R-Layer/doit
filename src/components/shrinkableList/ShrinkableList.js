import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import DetailPanel from "../detailPanel/DetailPanel";

import FilterOutBox from "../filteroutBox/FilterOutBox";

import { projects } from "../../redux/testList";

import "./shrinkable-list.scss";
class ShrinkableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }

  componentDidMount() {
    this.props.fetchList();
    window.addEventListener("resize", this.checkWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkWidth);
  }

  checkWidth = () => {
    this.setState({ width: window.innerWidth });
  };

  toggleDetail = e => {
    if (e.target.id === "input-box") return;

    this.setState({ mobile: window.innerWidth < 500 ? true : false });

    const { listStatus, setActive } = this.props;
    if (e.target.id === listStatus.activeItem) {
      setActive(null);
    } else {
      setActive(e.target.id);
    }
  };

  render() {
    const { listStatus, setFilter } = this.props;
    const actualItems = listStatus.listElements.filter(element =>
      element["project-title"].includes(listStatus.filterString)
    );
    //const actualItems = [];
    return (
      <article className="shrinkable-list-container">
        <ul
          className={`${!!listStatus.activeItem ? "shrinked" : ""} main-list`}
        >
          <FilterOutBox filterString={setFilter} />
          {actualItems.length === 0 ? (
            <li className="empty">
              <div className="empty-icon">
                <i className="icon icon-flag" />
              </div>
              <p className="empty-title h5">No workgroup yet</p>
              <p className="empty-subtitle">Click to create your own!</p>
              <div className="empty-action">
                <button className="btn btn-primary">
                  Create new workgroup
                </button>
              </div>
            </li>
          ) : (
            actualItems.map(el => (
              <li key={el.key} id={el.key}>
                <span key={el.key} id={el.key} onClick={this.toggleDetail}>
                  {el["project-title"]}
                </span>
                {this.state.mobile &&
                  listStatus.activeItem === el.key && (
                    <DetailPanel project={el} mobile={true} />
                  )}
              </li>
            ))
          )}
        </ul>
        {!this.state.mobile && (
          <CSSTransition
            in={!!listStatus.activeItem}
            timeout={800}
            classNames="slide"
            unmountOnExit
          >
            <DetailPanel project={projects[0]} mobile={false} />
          </CSSTransition>
        )}
      </article>
    );
  }
}

ShrinkableList.propTypes = {
  setActive: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  listStatus: PropTypes.shape({
    listElements: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        val: PropTypes.string
      })
    ).isRequired,
    filterString: PropTypes.string.isRequired,
    activeItem: PropTypes.string
  }).isRequired
};

export default ShrinkableList;
