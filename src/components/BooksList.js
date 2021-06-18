import React from 'react';

import Book from './Book';
import classes from './BooksList.module.css';

const BooksList = (props) => {
  return (
    <ul className={classes['books-list']}>
      {props.books.map((book,index) => (
        <Book
          key={index}
          title={book.title}
          name={book.name}
          cover={book.cover}
          publishYear={book.publishYear}
        />
      ))}
    </ul>
  );
};

export default BooksList;
