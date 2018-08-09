import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SearchView extends Component {
  render() {
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link
                to="/"
                className="close-search">Close
            </Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid" />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchView;
