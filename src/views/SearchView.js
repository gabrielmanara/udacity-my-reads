import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";

class SearchView extends Component {
  state = {
    books: [],
    query: ""
  };

  static propTypes = {
    updateBook: PropTypes.func,
    books: PropTypes.array.isRequired
  };

  componentWillReceiveProps(nextProps) {
    let books = [...this.state.books];
    books.map((book) => {
      nextProps.books.map((bookOnHome) => {
        if (book.id === bookOnHome.id) {
          book.shelf = bookOnHome.shelf;
        }
      });
    });

    return this.setState({ books });
  }

  clearState() {
    this.setState({ query: "", books: [] });
  }

  updateQuery(value) {
    this.setState({
      query: value
    });

    if (value !== "") {
      BooksAPI.search(value, 20).then(books => {
        if (
          books &&
          books.length &&
          typeof books !== "undefined" &&
          !books.error
        ) {
          this.setShelfOnResults(books);
        } else {
          this.setState({ books: [] });
        }
      });
    } else {
      this.clearState();
    }
  }

  setShelfOnResults(books) {
    books.map(book => {
      this.props.books.map(bookWithShelf => {
        if (book.id === bookWithShelf.id) {
          book.shelf = bookWithShelf.shelf;
        }
      });
    });

    this.setState({ books });
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
              <DebounceInput
                value={this.state.query}
                debounceTimeout={300}
                placeholder="Search by title or author"
                onChange={event => this.updateQuery(event.target.value)}
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
