import { Book } from "./book";

export interface ShelfCurrentLoans {
    book: Book;
    daysLeft: number;
}
