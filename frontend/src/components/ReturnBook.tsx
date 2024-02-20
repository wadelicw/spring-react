import { Book } from '@/types/book';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

export function ReturnBook({ book }: { book: Book }): ReactElement {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {book.img
          ? (
            <Image
              src={`/images/books/${book.img}`}
              width="151"
              height="233"
              alt="book"
            />
          )
          : (
            <Image
              src="/images/books/new-book-1.png"
              width="151"
              height="233"
              alt="book"
            />
          )}
        <h6 className="mt-2">{book.title}</h6>
        <p>{book.author}</p>
        <Link className="btn btn-outline-dark" href={`checkout/${book.id}`}>Reserve</Link>
      </div>
    </div>
  );
}
