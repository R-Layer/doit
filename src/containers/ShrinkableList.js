import { connect } from "react-redux";
import {
  fetchList,
  setActiveItem,
  setFilterString
} from "../redux/actions/listActions";

import ShrinkableList from "../components/shrinkableList/ShrinkableList";

const mapStateToProps = state => ({
  listStatus: state.list
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
  setActive: id => dispatch(setActiveItem(id)),
  setFilter: filter => dispatch(setFilterString(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShrinkableList);
