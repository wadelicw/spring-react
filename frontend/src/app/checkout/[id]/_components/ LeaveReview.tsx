import { ReviewRequest } from "@/types/reviewRequest";
import { FC, useState } from "react";
import { StarsReview } from "./StarsReview";

export const LeaveReview: FC<{ bookId: number }> = (props) => {

  const [starInput, setStarInput] = useState(0);
  const [displayInput, setDisplayInput] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");
  const [isReviewLeft, setIsReviewLeft] = useState(false);

  function starValue(value: number) {
    setStarInput(value);
    setDisplayInput(true);
  }

  const submitReview = async (starInput: number, reviewDescription: string) => {
    let bookId: number = 0;
    if (props.bookId) {
      bookId = props.bookId;
    }

    const reviewRequestModel: ReviewRequest = { rating: starInput, bookId, reviewDescription };
    const url = process.env.apiEndpoint + "/reviews/secure";
    const requestOptions = {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewRequestModel)
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsReviewLeft(true);
  }


  return (
    <div>
      <hr />
      {
        isReviewLeft ?
          <b>Thank you for your review!</b> :
          <div className="dropdown" style={{ cursor: "pointer" }}>
            <h5 className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">
              Leave a review?
            </h5>
            <ul id="submitReviewRating" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><button onClick={() => starValue(0)} className="dropdown-item">0 star</button></li>
              <li><button onClick={() => starValue(.5)} className="dropdown-item">.5 star</button></li>
              <li><button onClick={() => starValue(1)} className="dropdown-item">1 star</button></li>
              <li><button onClick={() => starValue(1.5)} className="dropdown-item">1.5 star</button></li>
              <li><button onClick={() => starValue(2)} className="dropdown-item">2 star</button></li>
              <li><button onClick={() => starValue(2.5)} className="dropdown-item">2.5 star</button></li>
              <li><button onClick={() => starValue(3)} className="dropdown-item">3 star</button></li>
              <li><button onClick={() => starValue(3.5)} className="dropdown-item">3.5 star</button></li>
              <li><button onClick={() => starValue(4)} className="dropdown-item">4 star</button></li>
              <li><button onClick={() => starValue(4.5)} className="dropdown-item">4.5 star</button></li>
              <li><button onClick={() => starValue(5)} className="dropdown-item">5 star</button></li>
            </ul>
            <StarsReview rating={starInput} size={32} />

            {displayInput &&
              <form method="POST" action="#">
                <hr />

                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>
                  <textarea className="form-control" id="submitReviewDescription" placeholder="Optional"
                    rows={3} onChange={e => setReviewDescription(e.target.value)}>
                  </textarea>
                </div>

                <div>
                  <button type="button" onClick={() => submitReview(starInput, reviewDescription)} className="btn btn-primary mt-3">Submit Review</button>
                </div>
              </form>
            }

          </div>
      }
    </div>
  )
};