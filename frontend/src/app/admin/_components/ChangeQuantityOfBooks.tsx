import { FC, useEffect, useState } from 'react';
import { Pagination } from '@/components/Pagination';
import { SpinnerLoading } from '@/components/SpinnerLoading';
import { Book } from '@/types/book';
import { ChangeQuantityOfBook } from './ChangeQuantityOfBook';

export const ChangeQuantityOfBooks: FC<{}> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [bookDelete, setBookDelete] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `${process.env.apiEndpoint}/books?page=${currentPage - 1}&size=${booksPerPage}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.books;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBooks: Book[] = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks();
  }, [currentPage, bookDelete]);

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  const lastItem = booksPerPage * currentPage <= totalAmountOfBooks
    ? booksPerPage * currentPage : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteBook = () => setBookDelete(!bookDelete);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  return (
    <div className="container mt-5">
      {totalAmountOfBooks > 0
        ? (
          <>
            <div className="mt-3">
              <h3>
                Number of results: (
                {totalAmountOfBooks}
                )
              </h3>
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
              <ChangeQuantityOfBook book={book} key={book.id} deleteBook={deleteBook} />
            ))}
          </>
        )
        : <h5>Add a book before changing quantity</h5>}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>
  );
};
