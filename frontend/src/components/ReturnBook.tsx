import { Book } from "@/types/book";
import Link from "next/link";
import { FC } from "react";

export const ReturnBook: FC<{ book: Book }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.book.img ?
          <img
            src={props.book.img}
            width="151"
            height="233"
            alt="book"
          />
          :
          <img
            src={"/images/books/new-book-1.png"}
            width="151"
            height="233"
            alt="book"
          />
        }
        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        <Link className="btn btn-outline-dark" href={`checkout/${props.book.id}`}>Reserve</Link>
      </div>
    </div>
  );
}