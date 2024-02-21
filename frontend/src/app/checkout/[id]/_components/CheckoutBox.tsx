'use client';

import { SpinnerLoading } from '@/components/SpinnerLoading';
import { Book } from '@/types/book';
import { useSession } from 'next-auth/react';
import {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { LeaveReview } from './ LeaveReview';
import { ButtonRender } from './ButtonRender';

interface CheckoutBoxProps { book: Book }

export function CheckoutBox({ book }: CheckoutBoxProps): ReactElement {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (session) {
        const url = `${process.env.apiEndpoint}/books/secure/ischeckedout/byuser?bookId=${book?.id}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const bookCheckedOut = await fetch(url, requestOptions);

        if (!bookCheckedOut.ok) {
          throw new Error('Something went wrong!');
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        setIsCheckedOut(bookCheckedOutResponseJson);
      }
    };
    fetchUserCheckedOutBook();
  }, [session, book?.id]);

  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (session) {
        const url = `${process.env.apiEndpoint}/books/secure/currentloans/count`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const currentLoansCountResponseJson = await currentLoansCountResponse.json();
        setCurrentLoansCount(currentLoansCountResponseJson);
        setIsLoading(false);
      }
    };
    fetchUserCurrentLoansCount();
  }, [session, isCheckedOut]);

  const checkoutBook = useCallback(async () => {
    if (!session) return;
    const url = `${process.env.apiEndpoint}/books/secure/checkout?bookId=${book?.id}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        'Content-Type': 'application/json',
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setIsCheckedOut(true);
  }, [session, book?.id]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  return (
    <div className="card col-3 container d-flex mb-5">
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>
              {currentLoansCount}
              /5
              {' '}
            </b>
            books checked out
          </p>
          <hr />
          {book && book.copiesAvailable && book.copiesAvailable > 0
            ? (
              <h4 className="text-success">
                Available
              </h4>
            )
            : (
              <h4 className="text-danger">
                Wait List
              </h4>
            )}
          <div className="row">
            <p className="col-6 lead">
              <b>
                {book?.copies}
                {' '}
              </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>
                {book?.copiesAvailable}
                {' '}
              </b>
              available
            </p>
          </div>
        </div>
        <ButtonRender
          session={session}
          isCheckedOut={isCheckedOut}
          currentLoansCount={currentLoansCount}
          checkoutBook={checkoutBook}
        />
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        {
          session
            ? <LeaveReview bookId={book.id} />
            : <p>Sign in to be able to leave a review.</p>
        }
      </div>
    </div>
  );
}
