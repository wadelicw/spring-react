import { FC } from "react";
import { BookDetails } from "./_components/BookDetails";

const Checkout: FC<{ params: { id: string } }> = (props) => {
    return (
        <div className="container d-none d-lg-block">
            <div className="row mt-5">
                <BookDetails id={props.params.id} />
                {/* <CheckoutBox book={book} mobile={false} currentLoansCount={currentLoansCount}
                    isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                    checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} /> */}
            </div>
            <hr />
            {/* <ReviewBox reviews={reviews} bookId={book?.id} mobile={false} /> */}
        </div>
    );
}

export default Checkout;
