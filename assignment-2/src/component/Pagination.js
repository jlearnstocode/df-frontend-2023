import clsx from "clsx";
import React from "react";

function Pagination({ totalPage, currentPage, setCurrentPage }) {
  return (
    <div className="pagination">
      {[...Array(totalPage)].map((_, idx) => (
        <div
          onClick={() => setCurrentPage(idx + 1)}
          className={clsx(
            "pagination-item",
            currentPage === idx + 1 && "active"
          )}
        >
          {idx + 1}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
