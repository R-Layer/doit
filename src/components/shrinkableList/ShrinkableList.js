import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import DetailPanel from "../detailPanel/DetailPanel";
import FilterOutBox from "../filteroutBox/FilterOutBox";

import "./shrinkable-list.scss";
class ShrinkableList extends Component {
  componentDidMount() {
    this.props.fetchList();
  }

  toggleDetail = e => {
    if (e.target.id === "input-box") return;
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
      element.val.includes(listStatus.filterString)
    );
    return (
      <article className="shrinkable-list-container">
        <ul onClick={this.toggleDetail}>
          <FilterOutBox filterString={setFilter} />
          {actualItems.map(el => (
            <li key={el.key} id={el.key}>
              {el.val}
            </li>
          ))}
        </ul>
        <CSSTransition
          in={!!listStatus.activeItem}
          timeout={800}
          classNames="slide"
          unmountOnExit
        >
          <DetailPanel>{listStatus.activeItem} </DetailPanel>
        </CSSTransition>
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
