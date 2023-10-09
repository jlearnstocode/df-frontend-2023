'use client';

import React, { useState } from 'react';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import BookTable from '../components/BookTable';
import { AddBookModal } from '../components/AddBookModal';

export default function Home() {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <section className="my-4 px-3 w-full flex justify-end">
        <SearchBox />
        <Button
          text="Add book"
          variant="main-button"
          onClick={() => setIsShowModal(true)}
        />
      </section>

      <section className="homepage book-table my-4  px-3 w-full">
        <BookTable />
      </section>

      <AddBookModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </>
  );
}
