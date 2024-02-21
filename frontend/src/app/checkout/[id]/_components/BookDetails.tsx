import { Book } from '@/types/book';
import Image from 'next/image';
import { ReactElement } from 'react';

interface BookDetailsProps { book: Book }

export function BookDetails({ book }: BookDetailsProps): ReactElement {
  return (
    <>
      <div className="col-sm-2 col-md-2">
        {book?.img
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
              src="new-book-1.png"
              width="151"
              height="233"
              alt="book"
            />
          )}
      </div>
      <div className="col-4 col-md-4 container">
        <div className="ml-2">
          <h2>{book?.title}</h2>
          <h5 className="text-primary">{book?.author}</h5>
          <p className="lead">{book?.description}</p>

        </div>
      </div>
    </>
  );
}
