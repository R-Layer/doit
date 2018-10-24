import React, { Component } from "react";
import DetailPanel from "./DetailPanel";

import { CSSTransition } from "react-transition-group";

import "./shrinkable-list.scss";
class ShrinkableList extends Component {
  state = {
    detailUp: false
  };

  componentDidMount() {
    this.props.fetchList();
  }

  toggleDetail = e => {
    const { listStatus, setActive } = this.props;

    if (
      e.target.id === listStatus.activeItem ||
      listStatus.activeItem === undefined
    ) {
      let listGroup = e.target.closest("ul");
      listGroup.classList.toggle("shrinked");
      this.setState({
        detailUp: !this.state.detailUp
      });
    }

    setActive(e.target.id);
  };

  render() {
    return (
      <section className="shrinkable-list-container">
        <ul className="" onClick={this.toggleDetail}>
          {this.props.listStatus.listElements.map(el => (
            <li key={el.key} id={el.key}>
              {el.val}
            </li>
          ))}
        </ul>
        <CSSTransition
          in={this.state.detailUp}
          timeout={800}
          classNames="slide"
          unmountOnExit
        >
          <DetailPanel>test</DetailPanel>
        </CSSTransition>
      </section>
    );
  }
}

export default ShrinkableList;
