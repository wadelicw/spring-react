'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { History } from '@/types/history';
import { SpinnerLoading } from '@/components/SpinnerLoading';
import { Pagination } from '@/components/Pagination';

export const HistoryPage: FC<{}> = () => {
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { data: session } = useSession();

  // Histories
  const [histories, setHistories] = useState<History[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (session) {
        const url = `${process.env.apiEndpoint}/histories/search/findBooksByUserEmail?userEmail=${session.user.sub}&page=${currentPage - 1}&size=5`;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const historyResponse = await fetch(url, requestOptions);
        if (!historyResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const historyResponseJson = await historyResponse.json();

        setHistories(historyResponseJson._embedded.histories);
        setTotalPages(historyResponseJson.page.totalPages);
      }
      setIsLoadingHistory(false);
    };
    fetchUserHistory();
  }, [session, currentPage]);

  if (isLoadingHistory) {
    return (
      <SpinnerLoading />
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {histories.length > 0
        ? (
          <>
            <h5>Recent History:</h5>

            {histories.map((history) => (
              <div key={history.id}>
                <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                  <div className="row g-0">
                    <div className="col-md-2">
                      <div className="d-none d-lg-block">
                        {history.img
                          ? <Image src={`/images/books/${history.img}`} width="123" height="196" alt="Book" />
                          : (
                            <Image
                              src="/images/books/new-book-1.png"
                              width="123"
                              height="196"
                              alt="Default"
                            />
                          )}
                      </div>
                      <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {history.img
                          ? <Image src={`/images/books/${history.img}`} width="123" height="196" alt="Book" />
                          : (
                            <Image
                              src="/images/books/new-book-1.png"
                              width="123"
                              height="196"
                              alt="Default"
                            />
                          )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="card-body">
                        <h5 className="card-title">
                          {' '}
                          {history.author}
                          {' '}
                        </h5>
                        <h4>{history.title}</h4>
                        <p className="card-text">{history.description}</p>
                        <hr />
                        <p className="card-text">
                          {' '}
                          Checked out on:
                          {history.checkoutDate}
                        </p>
                        <p className="card-text">
                          {' '}
                          Returned on:
                          {history.returnedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </>
        )
        : (
          <>
            <h3 className="mt-3">Currently no history: </h3>
            <Link className="btn btn-primary" href="search">
              Search for new book
            </Link>
          </>
        )}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>
  );
};
