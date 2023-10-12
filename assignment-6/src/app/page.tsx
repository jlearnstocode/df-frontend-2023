'use client';

import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import BookTable from '../components/BookTable';
import { BookModal } from '../components/BookModal';
import { useAuthState } from '../context/AuthContext';

export default function Home() {
  const [isShowBookModal, setIsShowBookModal] = useState(false);

  const { isLogin } = useAuthState();

  if (!isLogin) {
    redirect(`/login`);
    return;
  }

  return (
    <>
      <section className="my-4 px-3 w-full flex justify-end">
        <SearchBox />
        <Button
          text="Add book"
          variant="main-button"
          onClick={() => setIsShowBookModal(true)}
        />
      </section>

      <section className="homepage book-table my-4  px-3 w-full">
        <BookTable />
      </section>

      <BookModal
        mode="ADD_BOOK"
        isShowBookModal={isShowBookModal}
        setIsShowBookModal={setIsShowBookModal}
      />
    </>
  );
}
