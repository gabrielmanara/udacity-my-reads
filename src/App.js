import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookView from "./views/BooksView";
import SearchView from "./views/SearchView";

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  updateBook = (bookThatWillUpdate, event) => {
    const newShelf = event.target.value;
    BooksAPI.update(bookThatWillUpdate, newShelf).then(bookList => {
      this.state.books.map((book, index) => {
        if (book.id === bookThatWillUpdate.id) {
          const books = [...this.state.books];
          books[index].shelf = newShelf;
          this.setState({
            books,
          });
        }
      });
    });
  };

  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <BookView updateBook={this.updateBook} books={this.state.books} />
          )}
        />
        <Route
          path="/search"
          exact
          render={() => (
            <SearchView />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
