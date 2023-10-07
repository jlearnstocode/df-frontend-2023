import { createContext, useContext, useReducer } from 'react';
import bookData from './bookData';

const BookContext = createContext();

const initialState = { bookData };

const actions = {
  ADD_BOOK: 'ADD_BOOK',
  SEARCH_BOOK: 'SEARCH_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
};

function bookReducer(state, action) {
  switch (action.type) {
    case actions.ADD_BOOK:
      state = { ...state, bookData: [...state.bookData, action.payload] };
      break;

    case actions.DELETE_BOOK: {
      const id = action.payload;
      const newData = state.bookData?.filter((b) => b.id !== id);
      state = { ...state, bookData: newData };
      break;
    }

    case actions.SEARCH_BOOK: {
      const text = action.payload?.toLowerCase();
      const result = state.bookData?.filter((b) =>
        b.name.toLowerCase().includes(text),
      );

      state = {
        ...state,
        bookData: result,
      };
      break;
    }

    default:
      return state;
  }

  return state;
}

function BookProvider({ children }) {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  function addBook(book) {
    dispatch({ type: actions.ADD_BOOK, payload: book });
  }

  function deleteBook(id) {
    dispatch({ type: actions.DELETE_BOOK, payload: id });
  }

  function searchBook(text) {
    dispatch({ type: actions.SEARCH_BOOK, payload: text });
  }

  return (
    <BookContext.Provider
      value={{ state, dispatch, addBook, deleteBook, searchBook }}
    >
      {children}
    </BookContext.Provider>
  );
}

function useBookState() {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context.state;
}

function useBook() {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('Context should be use winthin a CountProvider');
  }

  return context;
}

export { BookProvider, useBook, useBookState };
