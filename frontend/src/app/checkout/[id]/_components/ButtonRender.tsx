import { Session } from 'next-auth';
import Link from 'next/link';
import { ReactElement } from 'react';

interface ButtonRenderProps {
  session: Session | null;
  isCheckedOut: boolean;
  currentLoansCount: number;
  checkoutBook: () => void;
}

export function ButtonRender({
  session, isCheckedOut, currentLoansCount, checkoutBook,
}: ButtonRenderProps): ReactElement {
  if (session) {
    if (!isCheckedOut && currentLoansCount < 5) {
      return (
        <button
          onClick={() => checkoutBook()}
          className="btn btn-success btn-lg"
          type="button"
        >
          Checkout
        </button>
      );
    } if (isCheckedOut) {
      return (<p><b>Book checked out. Enjoy!</b></p>);
    } if (!isCheckedOut) {
      return (<p className="text-danger">Too many books checked out.</p>);
    }
  }
  return (
    <Link href="/login" className="btn btn-success btn-lg">
      Sign in
    </Link>
  );
}
