import React, { useState, useRef } from "react";

import BooksList from "./components/BooksList";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const nameInput = useRef();

  const fetchBooksHandler = () => {
    setIsLoading(true);
    const enteredName = nameInput.current.value;
    if (enteredName.length === 0) {
      return;
    }

    const urlString = enteredName.replace(" ", "+");
    fetch("http://openlibrary.org/search.json?title=" + urlString)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedData = data.docs.map((book) => {
          return {
            title: book.title,
            name: book.author_name,
            cover: book.cover_i,
            publishYear: book.first_publish_year,
          };
        });
        setBooks(transformedData);
        setSearchSuccess(true);
        setIsLoading(false);
      });
    nameInput.current.value = "";
  };

  const dropdownChangeHandler = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "A-Z (Title)") {
      const booksValues = [...books];
      const sortedBooks = booksValues.sort((a, b) => {
        let regex = /[\W_]/g;
        let nameA = a.title.toLowerCase().replace(regex, "");
        let nameB = b.title.toLowerCase().replace(regex, "");
        if (nameA < nameB) {
          return -1;
        }
      });
      setBooks(sortedBooks);
    } else if (selectedValue === "Most Recent") {
      const copiedBooks = [...books];
      const sortedBooksByYear = copiedBooks.sort(
        (a, b) => b.publishYear - a.publishYear
      );
      console.log(sortedBooksByYear);
      setBooks(sortedBooksByYear);
    }
    console.log(event.target.value);
  };

  return (
    <React.Fragment>
      <section>
        <input type="text" placeholder="Enter a book title" ref={nameInput} />
        <button onClick={fetchBooksHandler}>Fetch Books</button>
        <section>
          <label htmlFor="books">Sort by:</label>
          <select name="books" id="books" onChange={dropdownChangeHandler}>
            <option value="A-Z (Title)">A-Z (Title)</option>
            <option value="Most Recent">Most Recent</option>
          </select>
        </section>
      </section>
      <section>
        {IsLoading && <p>Loading...</p>}
        {searchSuccess && !IsLoading && <BooksList books={books} />}
      </section>
    </React.Fragment>
  );
}

export default App;
