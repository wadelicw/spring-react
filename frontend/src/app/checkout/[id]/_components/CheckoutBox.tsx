"use client";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { Book } from "@/types/book";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { LeaveReview } from "./ LeaveReview";

export const CheckoutBox: FC<{ book: Book }> = (props) => {

  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (session) {
        const url = process.env.apiEndpoint + `/books/secure/ischeckedout/byuser?bookId=${props.book?.id}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json"
          }
        };
        const bookCheckedOut = await fetch(url, requestOptions);

        if (!bookCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        setIsCheckedOut(bookCheckedOutResponseJson);
      }
    }
    fetchUserCheckedOutBook();
  }, []);

  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (session) {
        const url = process.env.apiEndpoint + `/books/secure/currentloans/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json"
          }
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentLoansCountResponseJson = await currentLoansCountResponse.json();
        setCurrentLoansCount(currentLoansCountResponseJson);
        setIsLoading(false);
      }
    }
    fetchUserCurrentLoansCount().catch((error) => {
      window.alert(error.message);
      setIsLoading(false);
    });
  }, [session, isCheckedOut]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  async function checkoutBook() {
    if (session) {
      const url = process.env.apiEndpoint + `/books/secure/checkout?bookId=${props.book?.id}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json"
        }
      };
      const checkoutResponse = await fetch(url, requestOptions);
      if (!checkoutResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setIsCheckedOut(true);
    }
  }

  const ButtonRender: FC<{}> = () => {
    if (session) {
      if (!isCheckedOut && currentLoansCount < 5) {
        return (<button onClick={() => checkoutBook()} className="btn btn-success btn-lg">Checkout</button>)
      } else if (isCheckedOut) {
        return (<p><b>Book checked out. Enjoy!</b></p>)
      } else if (!isCheckedOut) {
        return (<p className="text-danger">Too many books checked out.</p>)
      }
    }
    return (
      <Link href={"/login"} className="btn btn-success btn-lg">
        Sign in
      </Link>
    );
  }

  return (
    <div className="card col-3 container d-flex mb-5">
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{currentLoansCount}/5 </b>
            books checked out
          </p>
          <hr />
          {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
            <h4 className="text-success">
              Available
            </h4>
            :
            <h4 className="text-danger">
              Wait List
            </h4>
          }
          <div className="row">
            <p className="col-6 lead">
              <b>{props.book?.copies} </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>{props.book?.copiesAvailable} </b>
              available
            </p>
          </div>
        </div>
        <ButtonRender />
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        {
          session ?
            <LeaveReview bookId={props.book.id} /> :
            <p>Sign in to be able to leave a review.</p>
        }
      </div>
    </div>
  );
};
