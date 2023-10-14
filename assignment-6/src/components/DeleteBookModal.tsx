import React from 'react';
import { mutate } from 'swr';
import ModalWrapper from './ModalWrapper';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';
import { BookType } from '../@types/book';
import { delay } from '../lib/helper';

interface DeleteBookModalProp {
  isShowModal: boolean;
  setIsShowModal: (b: boolean) => void;
  selectedBook: BookType | undefined;
  callbackFn?: () => void;
}

export function DeleteBookModal({
  isShowModal,
  setIsShowModal,
  selectedBook,
  callbackFn,
}: DeleteBookModalProp) {
  const { deleteBook } = useBook();

  function handleDeleteBook() {
    if (!selectedBook?.id) return;

    deleteBook(selectedBook?.id);
    setIsShowModal(false);

    delay(100).then(() => {
      mutate('get-books');
      if (callbackFn) callbackFn();
    });
  }

  return (
    <ModalWrapper
      mode="DELETE_BOOK"
      isShowModal={isShowModal}
      setIsShowModal={setIsShowModal}
    >
      <p>
        Do you want to delete
        <strong> {selectedBook?.name} </strong>
        book?
      </p>

      <ModalFooter
        actionText="Delete"
        handleSubmit={() => handleDeleteBook()}
        setIsShowModal={setIsShowModal}
      />
    </ModalWrapper>
  );
}
