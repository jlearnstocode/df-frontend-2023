'use client';

import React, { useState } from 'react';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import BookTable from '../components/BookTable';
import { BookModal } from '../components/BookModal';

export default function Home() {
  const [isShowBookModal, setIsShowBookModal] = useState(false);

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
