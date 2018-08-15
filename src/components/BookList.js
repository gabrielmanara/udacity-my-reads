import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookList extends Component {

  static propTypes = {
    title: PropTypes.string,
    listOfBooks: PropTypes.array,
    onShelfChange: PropTypes.func
  };

  render() {
    const { title, listOfBooks, onShelfChange } = this.props;
    
    return <div className="bookshelf">
        {title &&
          <h2 className="bookshelf-title">{title}</h2>
        }
        
        <div className="bookshelf-books">
          <ol className="books-grid">
            {listOfBooks.map(book => <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks &&
                      <div 
                        className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }} />
                    }
                  <div className="book-shelf-changer">
                    <select 
                      value={book.shelf ? book.shelf : "none"} 
                      onChange={(event) => onShelfChange(book, event)}>
                        <option value="" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors && book.authors.length > 0 && 
                    <div className="book-authors">
                        {book.authors.join(", ")}
                    </div>}
                </div>
              </li>)}
          </ol>
        </div>
      </div>;
  }
}

export default BookList