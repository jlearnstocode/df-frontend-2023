import React from 'react';
import ModalWrapper from './ModalWrapper';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';
import { BookType } from '../@types/book';

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

  return (
    <ModalWrapper
      mode="DELETE"
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
        handleSubmit={() => {
          if (!selectedBook?.id) return;
          deleteBook(selectedBook?.id);
          setIsShowModal(false);
          if (callbackFn) callbackFn();
        }}
        setIsShowModal={setIsShowModal}
      />
    </ModalWrapper>
  );
}
