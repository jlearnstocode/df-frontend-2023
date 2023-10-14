import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThreeCircles } from 'react-loader-spinner';
import Button from './Button';
import { DeleteBookModal } from './DeleteBookModal';
import Pagination from './Pagination';
import { BookModal } from './BookModal';
import { BookType } from '../@types/book';
import { Metadata } from '../@types/auth';

function BookTable({
  data,
  metadata,
  isLoading,
  setCurrentPage,
}: {
  setCurrentPage: (p: number) => void;
  isLoading: boolean;
  data: BookType[];
  metadata: Metadata;
}) {
  const router = useRouter();

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowBookModal, setIsShowBookModal] = useState(false);

  const [selectedBookId, setSetselectedBookId] = useState<number | null>(null);

  const selectedBook = useMemo(
    () => data?.find((b) => b.id === selectedBookId),
    [data, selectedBookId],
  );

  if (isLoading) {
    return (
      <div className="h-56 w-full flex items-center justify-center">
        Loading ...
        <ThreeCircles
          height="22"
          width="22"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    );
  }
  return (
    <>
      <DeleteBookModal
        isShowModal={isShowDeleteModal}
        setIsShowModal={setIsShowDeleteModal}
        selectedBook={selectedBook}
      />
      <BookModal
        selectedBook={selectedBook}
        mode="EDIT_BOOK"
        isShowBookModal={isShowBookModal}
        setIsShowBookModal={setIsShowBookModal}
      />

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="bg-gray-300 p-2">ID</th>
            <th className="bg-gray-300 p-2">Name</th>
            <th className="bg-gray-300 p-2">Author</th>
            <th className="bg-gray-300 p-2">Topic</th>
            <th className="bg-gray-300 p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td className="text-center py-4" colSpan={100}>
                No book here! 🙈
              </td>
            </tr>
          ) : (
            data?.map((book: BookType, idx: number) => {
              return (
                <tr key={idx}>
                  <td className="bg-white p-2">#{book?.id}</td>
                  <td className="bg-white p-2">{book?.name}</td>
                  <td className="bg-white p-2">{book?.author}</td>
                  <td className="bg-white p-">{book?.topic?.name}</td>
                  <td className="bg-white p-2 max-w-[150px]">
                    <Button
                      text="Edit"
                      variant="link-button"
                      onClick={() => {
                        setSetselectedBookId(book.id);
                        setIsShowBookModal(true);
                      }}
                    />
                    |
                    <Button
                      text="Delete"
                      variant="link-button"
                      onClick={() => {
                        setSetselectedBookId(book.id);
                        setIsShowDeleteModal(true);
                      }}
                    />
                    |
                    <Button
                      text="View"
                      variant="link-button"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/book/${book.id}`);
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
        totalPage={metadata?.totalPages}
        currentPage={metadata?.page}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default BookTable;
