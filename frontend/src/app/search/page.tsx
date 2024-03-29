'use client';

import { Pagination } from '@/components/Pagination';
import { SpinnerLoading } from '@/components/SpinnerLoading';
import { Book } from '@/types/book';
import { ReactElement, useEffect, useState } from 'react';
import { SearchBook } from './_components/SearchBook';

function Search(): ReactElement {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [categorySelection, setCategorySelection] = useState('Book category');

  useEffect(() => {
    setIsLoading(true);
    const fetchBooks = async () => {
      const baseUrl: string = `${process.env.apiEndpoint}/books`;
      let url: string = '';
      if (searchUrl === '') {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        const searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
        url = baseUrl + searchWithPage;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);
      setBooks(responseData);
      setIsLoading(false);
    };
    fetchBooks().catch(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, [currentPage, booksPerPage, searchUrl]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
    }
    setCategorySelection('Book category');
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === 'fe'
      || value.toLowerCase() === 'be'
      || value.toLowerCase() === 'data'
      || value.toLowerCase() === 'devops'
    ) {
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`);
    } else {
      setCategorySelection('All');
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
    }
  };

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  const lastItem = booksPerPage * currentPage <= totalAmountOfBooks
    ? booksPerPage * currentPage : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => categoryField('All')}
                      type="button"
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => categoryField('FE')}
                    >
                      Front End
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => categoryField('BE')}
                    >
                      Back End
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => categoryField('Data')}
                    >
                      Data
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => categoryField('DevOps')}
                    >
                      DevOps
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0
            ? (
              <>
                <div className="mt-3">
                  <h5>
                    Number of results: (
                    {totalAmountOfBooks}
                    )
                  </h5>
                </div>
                <p>
                  {indexOfFirstBook + 1}
                  {' '}
                  to
                  {lastItem}
                  {' '}
                  of
                  {totalAmountOfBooks}
                  {' '}
                  items:
                </p>
                {books.map((book) => (
                  <SearchBook book={book} key={book.id} />
                ))}
              </>
            )
            : (
              <div className="m-5">
                <h3>
                  Can&ldquo;t find what you are looking for?
                </h3>
                <button
                  type="button"
                  className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                >
                  Library Services
                </button>
              </div>
            )}
          {totalPages > 1
            && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
      </div>
    </div>
  );
}

export default Search;
