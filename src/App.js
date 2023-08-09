import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookShelves from "./BookShelves";
import SearchPage from "./SearchPage";
import Menu from "./Menu";
import { getAll, update } from './BooksAPI'
import { useState, useEffect } from "react";

/**
 * This is the root app component that holds all the child components
 * @returns 
 */
function App() {

  const bookShelves = [{ shelfTitle: 'Currently Reading', key: 'currentlyReading' }, { shelfTitle: 'Want to read', key: 'wantToRead' }, { shelfTitle: 'Read', key: 'read' }]
  const [allBooks, setAllBooks] = useState([]);
  /**
   * This use effect fetches the books and set all books
   * in internal state
   */
  useEffect(() => {

    const fetchBooks = async () => {
      let allBooksRes = [];
      try {
        allBooksRes = await getAll();
      } catch (e) {
        console.error('Error receiving all the books', e);
        throw e;
      } finally {
        setAllBooks(allBooksRes);
      }
    };

    fetchBooks();
  }, []);

  /**
   * Category change is propagated and update the state accordningly
   * @param {*} updatedBook 
   * @param {*} shelf 
   * @returns 
   */
  const onCategoryChange = async (updatedBook, shelf) => {

    try {
      const updatedResponse = await update(updatedBook, shelf);

      if (!updatedResponse) throw Error('No response received from update call');
    } catch (e) {
      console.error('Error received while trying to update the book', e);
      throw e;
    }

    let bookAvailable;
    let categoryChangedBooks = allBooks.map(book => {
      if (book.id === updatedBook.id) {
        bookAvailable = true
        return {
          ...updatedBook,
          shelf
        }
      } else return book;
    })

    categoryChangedBooks =  !bookAvailable ? [...allBooks, { ...updatedBook, shelf}]: categoryChangedBooks;

    setAllBooks(categoryChangedBooks)
  }
  return (
    <div className="app">
      {
        <div className="list-books">
          <Menu></Menu>
          <Routes>
            <Route exact path="/" element={allBooks.length && <BookShelves bookShelves={bookShelves} allBooks={allBooks} onCategoryChange={onCategoryChange} />} />
            <Route exact path="search" element={allBooks.length && <SearchPage onCategoryChange={onCategoryChange} allBooks={allBooks}/>} />
          </Routes>
        </div>
      }
    </div>
  );
}

export default App;
