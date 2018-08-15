import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import BookList from '../components/BookList'
import Header from "../components/Header";

class BooksView extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func
  };

  state = {
    shelfs: [
      {
        id: "currentlyReading",
        title: "Currently Reading"
      },
      {
        id: "wantToRead",
        title: "Want to Read"
      },
      {
        id: "read",
        title: "Read"
      }
    ]
  };

  getBooksByShelf = shelf => {
    return this.props.books.filter(books => books.shelf === shelf);
  };

  changeShelf = (book, event) => {
    this.props.updateBook(book, event);
  };

  render() {
    return (
      <div className="app">
        <Header title={`MyReads`} />
        
        <div className="list-books">
          <div className="list-books-content">
            <div>
              {this.state.shelfs.map(shelf => (
                <BookList
                  onShelfChange={this.changeShelf}
                  key={shelf.id}
                  listOfBooks={this.getBooksByShelf(shelf.id)}
                  title={shelf.title}
                />
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksView