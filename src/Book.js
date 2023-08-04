
import PropTypes from 'prop-types'

/**
 * Book component which is re-usable
 * @param {*} props 
 * @returns 
 */
const Book = function (props) {

    const { book, onCategoryChange } = props

    return (

        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${book.imageLinks.thumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => {
                        e.preventDefault();
                        onCategoryChange(book, e.target.value);
                    }} value={book.shelf}>
                        <option value="none" disabled>
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
            <div className="book-authors">{book.authors.join(',')}</div>
        </div>)
}
Book.propTypes = {
    bookShelves: PropTypes.arrayOf(PropTypes.object),
    allBooks: PropTypes.arrayOf(PropTypes.object),
    onCategoryChange: PropTypes.func
}

export default Book;