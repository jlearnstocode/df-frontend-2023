/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';
import { BookType } from '../@types/book';
import { BookForm } from './BookForm';

export function BookModal({
  mode,
  selectedBook,
  isShowBookModal,
  setIsShowBookModal,
}: {
  mode: string;
  selectedBook?: BookType;
  isShowBookModal: boolean;
  setIsShowBookModal: (v: boolean) => void;
}) {





  return (
    <ModalWrapper
      mode={mode}
      isShowModal={isShowBookModal}
      setIsShowModal={setIsShowBookModal}
    >
      <BookForm
        mode={mode}

        selectedBook={selectedBook}
        setIsShowModal={setIsShowBookModal}
      />

      
    </ModalWrapper>
  );
}
