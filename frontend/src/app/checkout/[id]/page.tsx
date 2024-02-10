"use client";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { Book } from "@/types/book";
import { FC, useEffect, useState } from "react";
import { BookDetails } from "./_components/BookDetails";
import { CheckoutBox } from "./_components/CheckoutBox";
import { ReviewBox } from "./_components/ReviewBox";


const Checkout: FC<{ params: { id: string } }> = (props) => {

    const [book, setBook] = useState<Book>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = process.env.apiEndpoint + `/books/${props.params.id}`;
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
        <div className="container">
            <div className="row mt-5">
                <BookDetails book={book as Book} />
                <CheckoutBox book={book as Book} />
            </div>
            <hr />
            <ReviewBox id={props.params.id} />
        </div>
    );
}

export default Checkout;
