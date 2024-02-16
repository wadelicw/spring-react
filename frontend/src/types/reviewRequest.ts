export interface ReviewRequest {
  rating: number;
  bookId: number;
  reviewDescription?: string;
}