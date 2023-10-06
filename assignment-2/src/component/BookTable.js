import React, { useMemo, useState } from "react";
import { useBookState } from "../context/BookContext";
import Button from "./Button";
import { DeleteBookModal } from "./DeleteBookModal";

function BookTable() {
  const { bookData } = useBookState();

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedBookId, setSetselectedBookId] = useState(null);

  const selectedBook = useMemo(
    () => bookData?.find((b) => b.id === selectedBookId),
    [bookData, selectedBookId]
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
          {bookData?.length === 0 ? (
            <tr>
              <td className="empty-list" colspan="100%">
                No book here! 🙈
              </td>
            </tr>
          ) : (
            bookData?.map((book, idx) => {
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
    </>
  );
}

export default BookTable;
