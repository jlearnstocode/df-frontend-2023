'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ThreeCircles } from 'react-loader-spinner';
import Button from '../../../components/Button';
import { DeleteBookModal } from '../../../components/DeleteBookModal';
import NotFoundPage from './not-found';
import client from '../../../lib/api';

type ParamsBook = {
  id: number;
};

function Book({ params }: { params: ParamsBook }) {
  const router = useRouter();
  const [isShowModal, setIsShowModal] = useState(false);

  const { data, isLoading } = useSWR('get-book-by-id', () =>
    client.getBookById({ id: params.id }),
  );

  const currBookInfo = data?.data;

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
          {currBookInfo?.topic?.name}
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
