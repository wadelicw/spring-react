import { KeyboardEvent, ReactElement } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (arg1: number) => void;
}

export function Pagination({ currentPage, totalPages, paginate }: PaginationProps): ReactElement {
  const pageNumbers = [];

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i += 1) {
    pageNumbers.push(i);
  }

  const handleKeyDown = (e: KeyboardEvent, pageNumber: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      paginate(pageNumber);
    }
  };

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            type="button"
            onClick={() => paginate(1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          >
            First Page
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button
              className="page-link"
              type="button"
              onClick={() => paginate(number)}
              onKeyDown={(e) => handleKeyDown(e, number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            type="button"
            onClick={() => paginate(totalPages)}
            onKeyDown={(e) => handleKeyDown(e, totalPages)}
          >
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
}
