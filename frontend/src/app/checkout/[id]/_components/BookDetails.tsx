"use client";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { Book } from "@/types/book";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { StarsReview } from "./StarsReview";

export const BookDetails: FC<{ id: string }> = (props) => {
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = process.env.apiEndpoint + `/books/${props.id}`;
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      setBook(responseJson);
      setIsLoading(false);
    };
    
    fetchBook().catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  return (
    <>
      <div className="col-sm-2 col-md-2">
        {book?.img ?
          <Image
            src={"/images/books/" + book.img}
            width="151"
            height="233"
            alt="book"
          />
          :
          <Image
            src={"new-book-1.png"}
            width="151"
            height="233"
            alt="book"
          />
        }
      </div>
      <div className="col-4 col-md-4 container">
        <div className="ml-2">
          <h2>{book?.title}</h2>
          <h5 className="text-primary">{book?.author}</h5>
          <p className="lead">{book?.description}</p>
          <StarsReview rating={3.5} size={32} />
        </div>
      </div>
    </>
  );
};
