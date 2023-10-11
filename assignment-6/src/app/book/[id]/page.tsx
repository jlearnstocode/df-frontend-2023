'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../../components/Button';
import { useBookState } from '../../../context/BookContext';
import { DeleteBookModal } from '../../../components/DeleteBookModal';
import NotFoundPage from './not-found';

type ParamsBook = {
  id: number;
};

function Book({ params }: { params: ParamsBook }) {
  const router = useRouter();
  const { bookData } = useBookState();
  const [isShowModal, setIsShowModal] = useState(false);

  const currBookInfo = useMemo(
    () => bookData.find((b) => b.id.toString() === params.id.toString()),
    [bookData, params.id],
  );

  if (!currBookInfo) {
    return <NotFoundPage />;
  }

  return (
    <>
      <section className="my-4 px-3 w-full flex justify-start">
        <button
          className="text-red-400 hover:text-red-900 px-0 w-16"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/`);
          }}
        >
          👈 Back
        </button>
      </section>
      <section className="my-4 px-3 w-full">
        <p className="text-2xl font-bold mb-4">{currBookInfo?.name}</p>
        <p className="mb-4">
          <strong>Author: </strong>
          {currBookInfo?.author}
        </p>
        <p className="mb-4">
          <strong>Topic: </strong>
          {currBookInfo?.topic}
        </p>
        <Button
          text="Delete"
          variant="link-button"
          onClick={() => setIsShowModal(true)}
        />
      </section>
      <DeleteBookModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        selectedBook={currBookInfo}
        callbackFn={() => router.push(`/`)}
      />
    </>
  );
}

export default Book;
