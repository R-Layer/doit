import { connect } from "react-redux";
import { fetchList, setActiveItem } from "../redux/actions/listActions";

import ShrinkableList from "../components/shrinkableList/ShrinkableList";

const mapStateToProps = state => ({
  listStatus: state.list
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
  setActive: id => dispatch(setActiveItem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShrinkableList);
