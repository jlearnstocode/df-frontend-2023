import clsx from 'clsx';
import React from 'react';

interface PaginationProps {
  totalPage: number | undefined;
  currentPage: number | undefined;
  setCurrentPage: (p: number) => void;
}

function Pagination({
  totalPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="flex justify-end mt-4">
      {[...Array(totalPage)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentPage(idx + 1)}
          className={clsx(
            'cursor-pointer border border-black border-solid w-8 h-8 m-4 mr-0 flex justify-center items-center',
            currentPage === idx + 1 && 'bg-blue-200',
          )}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
