
import PropTypes from 'prop-types'
import React from 'react'

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
                    style={ book?.imageLinks?.thumbnail ? {
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${book.imageLinks.thumbnail})`,
                    }: {
                        width: 128,
                        height: 193,
                        verticalAlign: 'text-verticle', 
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => {
                        e.preventDefault();
                        onCategoryChange(book, e.target.value);
                    }} value={book.shelf ?? 'none'}>
                        <option value="none" disabled >
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
            { book?.authors ? <div className="book-authors">{book.authors.join(',')}</div> : undefined }
        </div>)
}
Book.propTypes = {
    bookShelves: PropTypes.arrayOf(PropTypes.object),
    allBooks: PropTypes.arrayOf(PropTypes.object),
    onCategoryChange: PropTypes.func
}

export default React.memo(Book);