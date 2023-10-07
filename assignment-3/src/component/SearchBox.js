import React, { useState } from 'react';
import { useBook } from '../context/BookContext';

function SearchBox() {
  const { searchBook } = useBook();
  const [text, setText] = useState('');

  return (
    <input
      value={text}
      onChange={({ target }) => {
        setText(target.value);
        searchBook(target.value);
      }}
      type="text"
      name="search-books-input"
      id="search-books-input"
      className="search-books-input"
      placeholder="Search books"
    />
  );
}

export default SearchBox;
