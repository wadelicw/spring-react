import Image from 'next/image';
import { FC } from 'react';
import { Book } from '@/types/book';

export const BookDetails: FC<{ book: Book }> = (props) => (
  <>
    <div className="col-sm-2 col-md-2">
      {props.book?.img
        ? (
          <Image
            src={`/images/books/${props.book.img}`}
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
        <h2>{props.book?.title}</h2>
        <h5 className="text-primary">{props.book?.author}</h5>
        <p className="lead">{props.book?.description}</p>

      </div>
    </div>
  </>
);
