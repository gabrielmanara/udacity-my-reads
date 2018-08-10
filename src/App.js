import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookView from "./views/BooksView";
import SearchView from "./views/SearchView";

class BooksApp extends React.Component {
  state = {
    books: [],
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
      
      let booksCounter = 0;

      for (const key in bookList) {
        if (bookList.hasOwnProperty(key)) {
          booksCounter += bookList[key].length;
        }
      }
      
      // Has a new item on shelfs
      if (booksCounter > this.state.books.length) {
        const books = [...this.state.books];
        bookThatWillUpdate.shelf = newShelf;
        books.push(bookThatWillUpdate);
        return this.setState({ books });
      }

      // Remove books from shelfs
      if (booksCounter < this.state.books.length) {
        this.state.books.map((book, index) => {
          if (book.id === bookThatWillUpdate.id) {
            let books = [...this.state.books];
            books = books.slice(0, index);
            return this.setState({ books });
          }
        });
      }

      // Change books between shelfs
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
    return <div>
        <Route path="/" exact render={() => <BookView updateBook={this.updateBook} books={this.state.books} />} />
        <Route path="/search" exact render={() => <SearchView updateBook={this.updateBook} />} />
      </div>;
  }
}

export default BooksApp;
