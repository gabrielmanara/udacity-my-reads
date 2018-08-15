import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookView from "./views/BooksView";
import SearchView from "./views/SearchView";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  addNewBook(bookThatWillUpdate, newShelf) {
    const books = [...this.state.books];
    bookThatWillUpdate.shelf = newShelf;
    books.push(bookThatWillUpdate);

    return this.setState({ books });
  }

  removeBookFromShelf(bookThatWillUpdate) {
    this.state.books.map((book, index) => {
      if (book.id === bookThatWillUpdate.id) {
        let books = [...this.state.books];
        books.splice(index, 1);
        return this.setState({ books });
      }
      return this.state.books;
    });
  }

  changeBetweenShelfs(bookThatWillUpdate, newShelf) {
    this.state.books.map((book, index) => {
      if (book.id === bookThatWillUpdate.id) {
        const books = [...this.state.books];
        books[index].shelf = newShelf;
        this.setState({
          books
        });
      }
      return this.state.books;
    });
  }

  updateBook = (bookThatWillUpdate, event) => {
    const newShelf = event.target.value;

    BooksAPI.update(bookThatWillUpdate, newShelf).then(bookList => {
      let booksCounter = 0;

      for (const key in bookList) {
        if (bookList.hasOwnProperty(key)) {
          booksCounter += bookList[key].length;
        }
      }

      // Has a new item on shelfs
      if (booksCounter > this.state.books.length) {
        return this.addNewBook(bookThatWillUpdate, newShelf);
      }

      // Remove books from shelfs
      if (booksCounter < this.state.books.length) {
        return this.removeBookFromShelf(bookThatWillUpdate);
      }

      // Change books between shelfs
      return this.changeBetweenShelfs(bookThatWillUpdate, newShelf);
    });
  };

  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <BookView 
              updateBook={this.updateBook} 
              books={this.state.books} />
          )}
        />
        <Route
          path="/search"
          exact
          render={() => 
            <SearchView 
              updateBook={this.updateBook} 
              books={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;
