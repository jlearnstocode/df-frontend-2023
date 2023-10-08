'use client';

import { createContext, useContext, useMemo, useReducer } from 'react';
import bookData from './bookData';
import { BookInitialStateType, BookType } from '../@types/book';

const BookContext = createContext({} as BookInitialStateType);

const initialState: { bookData: BookType[] } = { bookData };

type ACTIONTYPE =
  | { type: 'ADD_BOOK'; payload: BookType }
  | { type: 'SEARCH_BOOK'; payload: string }
  | { type: 'DELETE_BOOK'; payload: number };

function bookReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'ADD_BOOK':
      state = { ...state, bookData: [...state.bookData, action.payload] };
      break;

    case 'DELETE_BOOK': {
      const id = action.payload;
      const newData = state.bookData?.filter((b) => b.id !== id);
      state = { ...state, bookData: newData };
      break;
    }

    case 'SEARCH_BOOK': {
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

function BookProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const value = useMemo(() => {
    function addBook(book: BookType) {
      dispatch({ type: 'ADD_BOOK', payload: book });
    }

    function deleteBook(id: number) {
      dispatch({ type: 'DELETE_BOOK', payload: id });
    }

    function searchBook(text: string) {
      dispatch({ type: 'SEARCH_BOOK', payload: text });
    }

    return {
      state,
      addBook,
      deleteBook,
      searchBook,
    };
  }, [state]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
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
