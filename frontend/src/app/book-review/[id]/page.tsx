"use client";
import { Pagination } from "@/components/Pagination";
import { ReviewItem } from "@/components/ReviewItem";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { Review } from "@/types/review";
import { FC, useEffect, useState } from "react";

const BookReview: FC<{ params: { id: string } }> = (props) => {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBookReviewsData = async () => {

      const reviewUrl: string = process.env.apiEndpoint + `/reviews/search/findByBookId?bookId=${props.params.id}&page=${currentPage - 1}&size=${reviewsPerPage}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
      setTotalPages(responseJsonReviews.page.totalPages);

      const loadedReviews: Review[] = [];

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].book_id,
          reviewDescription: responseData[key].reviewDescription,
        });
      }

      setReviews(loadedReviews);
      setIsLoading(false);
    };
    fetchBookReviewsData().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, [currentPage]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }


  const indexOfLastReview: number = currentPage * reviewsPerPage;
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

  let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ?
    reviewsPerPage * currentPage : totalAmountOfReviews;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="container mt-5">
      <div>
        <h3>Comments: ({reviews.length})</h3>
      </div>
      <p>
        {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
      </p>
      <div className="row">
        {reviews.map(review => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>
  );
}

export default BookReview;
