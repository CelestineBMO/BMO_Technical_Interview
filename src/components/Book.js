import React from 'react';

import classes from './Book.module.css';

const Book = (props) => {
  return (
    <li className={classes.book}>
      <p>Author Name: {props.name}</p>
      <p>Book title: {props.title}</p>
      <p>Book Cover: {props.cover}</p>
      <p>Published Year: {props.publishYear}</p>
    </li>
  );
};
export default Book;
