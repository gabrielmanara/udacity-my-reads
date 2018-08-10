import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

class SearchView extends Component {
  state = {
    books: [],
    query: ""
  };

  static propTypes = {
    updateBook: PropTypes.func
  };

  clearState() {
    this.setState({ query: "", books: [] });
  }

  updateQuery(value) {
    this.setState({
      query: value.trim()
    });

    if (value !== "") {
      BooksAPI.search(value, 20).then(books => {
        if (
          books &&
          books.length &&
          typeof books !== "undefined" &&
          !books.error
        ) {
          this.setState({ books: books });
        } else {
          this.setState({ books: [] });
        }
        
      });
    } else {
      this.clearState();
    }
  }

  changeShelf = (book, event) => {
    this.props.updateBook(book, event);
  };

  render() {
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                value={this.state.query}
                onChange={event => this.updateQuery(event.target.value)}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <BookList
              onShelfChange={this.changeShelf}
              listOfBooks={this.state.books}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchView;
