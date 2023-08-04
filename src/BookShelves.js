
import BooksShelf from "./BookShelf";
import PropTypes from 'prop-types'

/**
 * BookShelves component whch contains all the shelves that contains books
 * @param {*} props 
 * @returns 
 */
function BookShelves(props) {

  const { bookShelves, allBooks, onCategoryChange } = props;
  return (

    <div className="list-books-content">

      {bookShelves.map(shelf => (<BooksShelf key={shelf.key} shelfTitle={shelf.shelfTitle} shelfBooks={allBooks.filter(book => book.shelf === shelf.key)} onCategoryChange={onCategoryChange}></BooksShelf>))}

    </div>)
}

BookShelves.propTypes = {
  bookShelves: PropTypes.arrayOf(PropTypes.object),
  allBooks: PropTypes.arrayOf(PropTypes.object),
  onCategoryChange: PropTypes.func
}
export default BookShelves;