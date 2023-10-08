import React from 'react';
import ModalWrapper from './ModalWrapper';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';
import { BookType } from '../@types/book';

interface DeleteBookModalProp {
  isShowModal: boolean;
  setIsShowModal: (b: boolean) => void;
  selectedBook: BookType | undefined;
}

export function DeleteBookModal({
  isShowModal,
  setIsShowModal,
  selectedBook,
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
        }}
        setIsShowModal={setIsShowModal}
      />
    </ModalWrapper>
  );
}
