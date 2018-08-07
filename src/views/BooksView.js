import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookList from '../components/BookList'

class BooksView extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  getBooksByShelf = (shelf) => {
    return this.props.books.filter(books => books.shelf === shelf);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <BookList
              listOfBooks={this.getBooksByShelf('currentlyReading')}
              title={`Currently Reading`} />

            <BookList
              listOfBooks={this.getBooksByShelf('wantToRead')}
              title={`Want to Read`} />

            <BookList
              listOfBooks={this.getBooksByShelf('read')}
              title={`Read`} />

          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BooksView