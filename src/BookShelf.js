
import PropTypes from 'prop-types'
import Book from './Book'

/**
 * Book Shelf component that contains books
 * @param {*} props 
 * @returns 
 */
const BooksShelf = function (props) {

  const { shelfTitle, shelfBooks, onCategoryChange } = props;
  return (<div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {shelfBooks.map(shelfBook => (
          <li key={shelfBook.id}>
            <Book book={shelfBook} onCategoryChange={onCategoryChange}></Book>
          </li>
        ))}
      </ol>
    </div>
  </div>)
}

BooksShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  shelfBooks: PropTypes.arrayOf(PropTypes.object),
  onCategoryChange: PropTypes.func
}
export default BooksShelf;