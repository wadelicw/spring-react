import { Book } from '@/types/book';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';

interface ChangeQuantityOfBookProps { book: Book, deleteBook: () => void }

export function ChangeQuantityOfBook(
  { book, deleteBook }: ChangeQuantityOfBookProps,
): ReactElement {
  const [quantity, setQuantity] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBookInState = () => {
      setQuantity(book.copies ? book.copies : 0);
      setRemaining(book.copiesAvailable ? book.copiesAvailable : 0);
    };
    fetchBookInState();
  }, [book.copies, book.copiesAvailable]);

  async function increaseQuantity() {
    if (session) {
      const url = `${process.env.apiEndpoint}/admin/secure/increase/book/quantity?bookId=${book?.id}`;
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const quantityUpdateResponse = await fetch(url, requestOptions);
      if (!quantityUpdateResponse.ok) {
        throw new Error('Something went wrong!');
      }
      setQuantity(quantity + 1);
      setRemaining(remaining + 1);
    }
  }

  async function decreaseQuantity() {
    if (session) {
      const url = `${process.env.apiEndpoint}/admin/secure/decrease/book/quantity?bookId=${book?.id}`;
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const quantityUpdateResponse = await fetch(url, requestOptions);
      if (!quantityUpdateResponse.ok) {
        throw new Error('Something went wrong!');
      }
      setQuantity(quantity - 1);
      setRemaining(remaining - 1);
    }
  }

  async function deleteBookOnclick() {
    if (session) {
      const url = `${process.env.apiEndpoint}/admin/secure/delete/book?bookId=${book?.id}`;
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const updateResponse = await fetch(url, requestOptions);
      if (!updateResponse.ok) {
        throw new Error('Something went wrong!');
      }
      deleteBook();
    }
  }

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {book.img
              ? <Image src={`/images/books/${book.img}`} width="123" height="196" alt="Book" />
              : (
                <Image
                  src="/images/books/new-book-1.png"
                  width="123"
                  height="196"
                  alt="Book"
                />
              )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {book.img
              ? <Image src={`/images/books/${book.img}`} width="123" height="196" alt="Book" />
              : (
                <Image
                  src="/images/books/new-book-1.png"
                  width="123"
                  height="196"
                  alt="Book"
                />
              )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{book.author}</h5>
            <h4>{book.title}</h4>
            <p className="card-text">
              {' '}
              {book.description}
              {' '}
            </p>
          </div>
        </div>
        <div className="mt-3 col-md-4">
          <div className="d-flex justify-content-center algin-items-center">
            <p>
              Total Quantity:
              <b>{quantity}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Books Remaining:
              <b>{remaining}</b>
            </p>
          </div>
        </div>
        <div className="mt-3 col-md-1">
          <div className="d-flex justify-content-start">
            <button type="button" className="m-1 btn btn-md btn-danger" onClick={deleteBookOnclick}>Delete</button>
          </div>
        </div>
        <button type="button" className="m1 btn btn-md main-color text-white" onClick={increaseQuantity}>Add Quantity</button>
        <button type="button" className="m1 btn btn-md btn-warning" onClick={decreaseQuantity}>Decrease Quantity</button>
      </div>
    </div>
  );
}
