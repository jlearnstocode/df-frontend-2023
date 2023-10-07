import React, { useMemo, useState } from 'react';
import { useBookState } from '../context/BookContext';
import Button from './Button';
import { DeleteBookModal } from './DeleteBookModal';
import Pagination from './Pagination';

const ITEM_PER_PAGE = 5;

function BookTable() {
  const { bookData } = useBookState();

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedBookId, setSetselectedBookId] = useState(null);

  const selectedBook = useMemo(
    () => bookData?.find((b) => b.id === selectedBookId),
    [bookData, selectedBookId],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(bookData?.length / ITEM_PER_PAGE);

  const bookDataWithPage = useMemo(
    () =>
      bookData.slice(
        (currentPage - 1) * ITEM_PER_PAGE,
        currentPage * ITEM_PER_PAGE,
      ),
    [bookData, currentPage],
  );

  return (
    <>
      <DeleteBookModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        selectedBook={selectedBook}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookDataWithPage?.length === 0 ? (
            <tr>
              <td className="empty-list" colSpan="100%">
                No book here! 🙈
              </td>
            </tr>
          ) : (
            bookDataWithPage?.map((book, idx) => {
              return (
                <tr key={idx}>
                  <td>{book?.name}</td>
                  <td>{book?.author}</td>
                  <td>{book?.topic}</td>
                  <td>
                    <Button
                      text="Delete"
                      variant="link-button"
                      onClick={() => {
                        setSetselectedBookId(book.id);
                        setIsShowModal(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default BookTable;
