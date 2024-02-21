'use client';

import { Pagination } from '@/components/Pagination';
import { ReviewItem } from '@/components/ReviewItem';
import { SpinnerLoading } from '@/components/SpinnerLoading';
import { Review } from '@/types/review';
import { ReactElement, useEffect, useState } from 'react';

interface BookReviewProps { params: { id: string } }

function BookReview({ params: { id } }: BookReviewProps): ReactElement {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBookReviewsData = async () => {
      const reviewUrl: string = `${process.env.apiEndpoint}/reviews/search/findByBookId?bookId=${id}&page=${currentPage - 1}&size=${reviewsPerPage}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
      setTotalPages(responseJsonReviews.page.totalPages);

      const loadedReviews: Review[] = responseData;

      setReviews(loadedReviews);
      setIsLoading(false);
    };
    fetchBookReviewsData();
  }, [currentPage, id, reviewsPerPage]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  const indexOfLastReview: number = currentPage * reviewsPerPage;
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

  const lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews
    ? reviewsPerPage * currentPage : totalAmountOfReviews;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <div>
        <h3>
          Comments: (
          {reviews.length}
          )
        </h3>
      </div>
      <p>
        {indexOfFirstReview + 1}
        {' '}
        to
        {lastItem}
        {' '}
        of
        {totalAmountOfReviews}
        {' '}
        items:
      </p>
      <div className="row">
        {reviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </div>

      {
        totalPages > 1
        && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )
      }
    </div>
  );
}

export default BookReview;
