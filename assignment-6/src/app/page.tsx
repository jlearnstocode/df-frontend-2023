'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import BookTable from '../components/BookTable';
import { BookModal } from '../components/BookModal';
import { useAuthState } from '../context/AuthContext';
import client from '../lib/api';
import { delay } from '../lib/helper';

const ITEM_PER_PAGE = 5;

export default function Home() {
  const [isShowBookModal, setIsShowBookModal] = useState(false);

  const { isLogin } = useAuthState();

  const [text, setText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useSWR('get-books', () =>
    client.getBooks({
      page: currentPage,
      pageSize: ITEM_PER_PAGE,
      query: text,
    }),
  );

  const bookData = data?.data;
  const metadata = data?.metadata;

  useEffect(() => {
    // TODO: add debounce no fire API call if text change
    delay(1000).then(() => {
      mutate('get-books');
    });
  }, [currentPage, text]);

  if (!isLogin) {
    redirect(`/login`);
    return;
  }

  return (
    <>
      <section className="my-4 px-3 w-full flex justify-end">
        <SearchBox text={text} setText={setText} />
        <Button
          text="Add book"
          variant="main-button"
          onClick={() => setIsShowBookModal(true)}
        />
      </section>

      <section className="homepage book-table my-4  px-3 w-full">
        <BookTable
          data={bookData || []}
          metadata={
            metadata || { page: 0, pageSize: 0, totalPages: 0, totalRecords: 0 }
          }
          isLoading={isLoading}
          setCurrentPage={setCurrentPage}
        />
      </section>

      <BookModal
        mode="ADD_BOOK"
        isShowBookModal={isShowBookModal}
        setIsShowBookModal={setIsShowBookModal}
      />
    </>
  );
}
