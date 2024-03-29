'use client';

import { ReviewItem } from '@/components/ReviewItem';
import { SpinnerLoading } from '@/components/SpinnerLoading';
import { StarsReview } from '@/components/StarsReview';
import { Review } from '@/types/review';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';

interface ReviewBoxProps { id: string }

export function ReviewBox({ id }: ReviewBoxProps): ReactElement {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookReviews = async () => {
      setIsLoading(true);
      const reviewUrl: string = `${process.env.apiEndpoint}/reviews/search/findByBookId?bookId=${id}`;
      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJsonReviews = await responseReviews.json();
      const responseData = responseJsonReviews._embedded.reviews;
      const loadedReviews: Review[] = [];
      let weightedStarReviews: number = 0;

      Object.keys(responseData).forEach((key) => {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews += responseData[key].rating;
      });

      if (loadedReviews) {
        const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoading(false);
    };

    fetchBookReviews().catch(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  return (
    <div className="row mt-5">
      <div className="col-sm-2 col-md-2">
        <h4>Latest Reviews (avg stars): </h4>
        <StarsReview rating={totalStars} size={32} />
      </div>
      <div className="col-sm-10 col-md-10">
        {reviews.length > 0
          ? (
            <>
              {reviews.slice(0, 3).map((eachReview) => (
                <ReviewItem review={eachReview} key={eachReview.id} />
              ))}

              <div className="m-3">
                <Link
                  type="button"
                  className="btn main-color btn-md btn-success"
                  href={`/book-review/${id}`}
                >
                  Reach all reviews.
                </Link>
              </div>
            </>
          )
          : (
            <div className="m-3">
              <p className="lead">
                Currently there are no reviews for this book
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
