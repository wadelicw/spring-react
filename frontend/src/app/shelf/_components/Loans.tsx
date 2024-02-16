"use client";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { ShelfCurrentLoans } from "@/types/shelfCurrentLoans";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { LoansModal } from "./LoansModal";

export const Loans: FC<{}> = () => {

  // Current Loans
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      if (session) {
        const url = process.env.apiEndpoint + `/books/secure/currentloans`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json"
          }
        };
        const shelfCurrentLoansResponse = await fetch(url, requestOptions);
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
        setShelfCurrentLoans(shelfCurrentLoansResponseJson);
      }
      setIsLoadingUserLoans(false);
    }
    fetchUserCurrentLoans();
    window.scrollTo(0, 0);
  }, [checkout]);

  if (isLoadingUserLoans) {
    return (
      <SpinnerLoading />
    );
  }

  async function returnBook(bookId: number) {
    if (session) {
      const url = process.env.apiEndpoint + `/books/secure/return?bookId=${bookId}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json"
        }
      };
      const returnResponse = await fetch(url, requestOptions);
      if (!returnResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setCheckout(!checkout);
    }
  }

  async function renewLoan(bookId: number) {
    if (session) {
      const url = process.env.apiEndpoint + `/books/secure/renew/loan?bookId=${bookId}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json"
        }
      };

      const returnResponse = await fetch(url, requestOptions);
      if (!returnResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setCheckout(!checkout);
    }
  }

  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {shelfCurrentLoans.length > 0 ?
          <>
            <h5>Current Loans: </h5>

            {shelfCurrentLoans.map(shelfCurrentLoan => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {shelfCurrentLoan.book?.img ?
                      <Image src={"/images/books/" + shelfCurrentLoan.book?.img} width="226" height="349" alt="Book" />
                      :
                      <Image src={"/images/books/new-book-1.png"}
                        width="226" height="349" alt="Book" />
                    }
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {shelfCurrentLoan.daysLeft > 0 &&
                          <p className="text-secondary">
                            Due in {shelfCurrentLoan.daysLeft} days.
                          </p>
                        }
                        {shelfCurrentLoan.daysLeft === 0 &&
                          <p className="text-success">
                            Due Today.
                          </p>
                        }
                        {shelfCurrentLoan.daysLeft < 0 &&
                          <p className="text-danger">
                            Past due by {shelfCurrentLoan.daysLeft} days.
                          </p>
                        }
                        <div className="list-group mt-3">
                          <button className="list-group-item list-group-item-action"
                            aria-current="true" data-bs-toggle="modal"
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}>
                            Manage Loan
                          </button>
                          <Link href={"search"} className="list-group-item list-group-item-action">
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Help other find their adventure by reviewing your loan.
                      </p>
                      <Link className="btn btn-primary" href={`/checkout/${shelfCurrentLoan.book.id}`}>
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} returnBook={returnBook}
                  renewLoan={renewLoan} />
              </div>
            ))}
          </> :
          <>
            <h3 className="mt-3">
              Currently no loans
            </h3>
            <Link className="btn btn-primary" href={`search`}>
              Search for a new book
            </Link>
          </>
        }
      </div>

      {/* Mobile */}
      <div className="container d-lg-none mt-2">
        {shelfCurrentLoans.length > 0 ?
          <>
            <h5 className="mb-3">Current Loans: </h5>

            {shelfCurrentLoans.map(shelfCurrentLoan => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {shelfCurrentLoan.book?.img ?
                    <Image src={"/images/books/" + shelfCurrentLoan.book?.img} width="226" height="349" alt="Book" />
                    :
                    <Image src={"/images/books/new-book-1.png"}
                      width="226" height="349" alt="Book" />
                  }
                </div>
                <div className="card d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Loan Options</h4>
                      {shelfCurrentLoan.daysLeft > 0 &&
                        <p className="text-secondary">
                          Due in {shelfCurrentLoan.daysLeft} days.
                        </p>
                      }
                      {shelfCurrentLoan.daysLeft === 0 &&
                        <p className="text-success">
                          Due Today.
                        </p>
                      }
                      {shelfCurrentLoan.daysLeft < 0 &&
                        <p className="text-danger">
                          Past due by {shelfCurrentLoan.daysLeft} days.
                        </p>
                      }
                      <div className="list-group mt-3">
                        <button className="list-group-item list-group-item-action"
                          aria-current="true" data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}>
                          Manage Loan
                        </button>
                        <Link href={"search"} className="list-group-item list-group-item-action">
                          Search more books?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3">
                      Help other find their adventure by reviewing your loan.
                    </p>
                    <Link className="btn btn-primary" href={`/checkout/${shelfCurrentLoan.book.id}`}>
                      Leave a review
                    </Link>
                  </div>
                </div>

                <hr />
                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} returnBook={returnBook}
                  renewLoan={renewLoan} />
              </div>
            ))}
          </> :
          <>
            <h3 className="mt-3">
              Currently no loans
            </h3>
            <Link className="btn btn-primary" href={`search`}>
              Search for a new book
            </Link>
          </>
        }
      </div>
    </div>
  );
}