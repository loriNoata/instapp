import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSearchTerm, updatePageNumber } from "./../action";
//import debounce from 'loadash/debounce';

const search = debounce((value, onUpdateSearchTerm) => {
  onUpdateSearchTerm(value);
}, 400);

function Header(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = value => {
    setSearchTerm(value);
    search(value, props.onUpdateSearchTerm);
  };

  return (
    <div className="header-container">
      <input
        type="text"
        value={searchTerm}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}

function debounce(fn, interval) {
  let timer;
  return function debounced() {
    clearTimeout(timer);
    let args = arguments;
    let that = this;
    timer = setTimeout(function callOriginalFn() {
      fn.apply(that, args);
    }, interval);
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateSearchTerm: searchTerm => dispatch(updateSearchTerm(searchTerm))
  };
};

export default connect(null, mapDispatchToProps)(Header);
