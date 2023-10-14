import React from 'react';

function SearchBox({
  text,
  setText,
}: {
  text: string;
  setText: (t: string) => void;
}) {
  return (
    <input
      value={text}
      onChange={({ target }) => setText(target.value)}
      type="text"
      name="search-books-input"
      id="search-books-input"
      className="mr-2"
      placeholder="Search book name or author"
    />
  );
}

export default SearchBox;
