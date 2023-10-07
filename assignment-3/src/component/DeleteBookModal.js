import React from 'react';
import ModalWrapper from './ModalWrapper';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';

export function DeleteBookModal({ isShowModal, setIsShowModal, selectedBook }) {
  const { deleteBook } = useBook();

  return (
    <ModalWrapper
      mode="DELETE"
      isShowModal={isShowModal}
      setIsShowModal={setIsShowModal}
    >
      <p>
        Do you want to delete 
        {' '}
        <strong>{selectedBook?.name}</strong>
        {' '}
        book?
      </p>
      <ModalFooter
        actionText="Delete"
        handleSubmit={() => {
          deleteBook(selectedBook?.id);
          setIsShowModal(false);
        }}
        setIsShowModal={setIsShowModal}
      />
    </ModalWrapper>
  );
}
