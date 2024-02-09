export interface Review {
  id: number;
  userEmail: string;
  date: string;
  rating: number;
  book_id: number;
  reviewDescription?: string;
}