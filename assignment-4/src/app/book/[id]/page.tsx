'use client';

import React from 'react';

type ParamsBook = {
  id: number;
};

function Book({ params }: { params: ParamsBook }) {
  return <div>Book {params.id}</div>;
}

export default Book;
