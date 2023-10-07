import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';
import { AddBookForm } from './AddBookForm';

export function AddBookModal({ isShowModal, setIsShowModal }) {
  const { addBook } = useBook();
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    topic: 'Code refactoring',
  });

  function handleAddBook() {
    if (!newBook.name || !newBook.author || !newBook.topic) {
      return;
    }
    addBook(newBook);
    setIsShowModal(false);
  }

  return (
    <ModalWrapper
      mode="ADD"
      isShowModal={isShowModal}
      setIsShowModal={setIsShowModal}
    >
      <AddBookForm newBook={newBook} setNewBook={setNewBook} />

      <ModalFooter
        actionText="Add"
        newBook={newBook}
        handleSubmit={() => handleAddBook()}
        setIsShowModal={setIsShowModal}
      />
    </ModalWrapper>
  );
}
