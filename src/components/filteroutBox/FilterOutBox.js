import React from "react";
import PropTypes from "prop-types";

const FilterOutBox = ({ filterString }) => {
  return (
    <input
      className="input-box"
      id="input-box"
      onChange={e => filterString(e.target.value)}
    />
  );
};

FilterOutBox.propTypes = {
  filterString: PropTypes.func.isRequired
};
export default FilterOutBox;
