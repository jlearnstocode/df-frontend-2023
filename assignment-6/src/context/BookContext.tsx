'use client';

import { createContext, useContext, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import {
  BookInitialStateType,
  BookType,
  NewBookType,
  UpdateBookType,
} from '../@types/book';
import client from '../lib/api';

const BookContext = createContext({} as BookInitialStateType);

const initialState: { bookData: BookType[] } = { bookData: [] };

type ACTIONTYPE =
  | { type: 'SEARCH_BOOK'; payload: string }
  | { type: 'DELETE_BOOK'; payload: number };

function bookReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
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
  const [state] = useReducer(bookReducer, initialState);

  const value = useMemo(() => {
    async function addBook(book: NewBookType) {
      await client.createBook(book);
      toast(`Successful!`, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    }

    async function editBook(book: UpdateBookType) {
      await client.updateBook(book);
      toast(`Successful!`, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    }

    async function deleteBook(id: number) {
      await client.deleteBook({ id });
      toast(`Successful!`, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    }

    return {
      state,
      addBook,
      editBook,
      deleteBook,
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
