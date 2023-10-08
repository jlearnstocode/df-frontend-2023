import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';
import { AddBookForm } from './AddBookForm';
import { BookType } from '../@types/book';

export function AddBookModal({
  isShowModal,
  setIsShowModal,
}: {
  isShowModal: boolean;
  setIsShowModal: (v: boolean) => void;
}) {
  const { addBook } = useBook();
  const [newBook, setNewBook] = useState<BookType>({
    id: 0,
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
      <AddBookForm setNewBook={setNewBook} />

      <ModalFooter
        actionText="Add"
        handleSubmit={() => handleAddBook()}
        setIsShowModal={setIsShowModal}
      />
    </ModalWrapper>
  );
}
