import { useEffect, useState } from "react";
import Book from "./Book";
import PropTypes from 'prop-types'
import { search } from './BooksAPI'
import { useDebounce } from "./utils/useDebounce";

/**
 * Filter text based on the searchtext and allbooks
 * @param {*} searchText 
 * @param {*} allBooks 
 * @returns 
 */
// function filterText(searchText, allBooks) {
//   if (searchText) {
//     const searchedValue = searchText.toLowerCase();
//     const filtered = allBooks.filter(book => (book.title.toLowerCase().includes(searchedValue)
//       || book.authors.join(' ').toLowerCase().includes(searchedValue)
//       || book.industryIdentifiers.map(inId => inId.type).join(' ').toLowerCase().includes(searchedValue)
//     ));
//     return filtered;
//   } else {
//     return allBooks;
//   }
// }
/**
 * Search page component that can be used to search books by
 * name, author and title
 * @param {*} props 
 * @returns 
 */
function SearchPage(props) {

  const {  onCategoryChange } = props;
  const [ searchedBooks, setSearchedBooks ]=  useState([]);
  const [ searchedText, setSearchedText ]=  useState();
  const debouncedValue = useDebounce(searchedText, 500);

  const onTextChange = (e) => {
    e.preventDefault();
    setSearchedText(e.target.value);
  }

  useEffect(()=>{

    if (!debouncedValue) {
      setSearchedBooks([]);
      return;
    }
    search(debouncedValue, 100).then(result => {

      if (result.error) throw Error('Response error');
      setSearchedBooks(result);
    }).catch(e => {
      console.error('Error occurred', e);
      setSearchedBooks([]);
      alert('Invalid search query');
    });
  }, [debouncedValue] );

  return (<div className="search-books">
    <div className="search-books-bar">

      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={onTextChange}
        />
      </div>
    </div>
    <div className="search-books-results">

      <ol className="books-grid">
        {searchedBooks && searchedBooks.map(book => (
          <li key={book.id}>
            <Book book={book} onCategoryChange={onCategoryChange}></Book>
          </li>
        ))}
      </ol>
    </div>
  </div>)
}

SearchPage.propTypes = {
  allBooks: PropTypes.arrayOf(PropTypes.object),
  onCategoryChange: PropTypes.func
}

export default SearchPage;