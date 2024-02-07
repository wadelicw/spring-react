import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const SearchBook: FC<{ book: Book }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {props.book.img ?
              <Image src={props.book.img}
                width="123"
                height="196"
                alt="Book"
              />
              :
              <Image src={"/images/books/new-book-1.png"}
                width="123"
                height="196"
                alt="Book"
              />
            }
          </div>
          <div className="d-lg-none d-flex justify-content-center
                        align-items-center">
            {props.book.img ?
              <Image src={props.book.img}
                width="123"
                height="196"
                alt="Book"
              />
              :
              <Image src={"/images/books/new-book-1.png"}
                width="123"
                height="196"
                alt="Book"
              />
            }
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">
              {props.book.author}
            </h5>
            <h4>
              {props.book.title}
            </h4>
            <p className="card-text">
              {props.book.description}
            </p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link className="btn btn-md btn-outline-primary" href={`/checkout/${props.book.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}