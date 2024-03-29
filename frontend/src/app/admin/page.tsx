'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import { AddNewBook } from './_components/AddNewBook';
import { AdminMessages } from './_components/AdminMessages';
import { ChangeQuantityOfBooks } from './_components/ChangeQuantityOfBooks';

function Admin(): ReactElement {
  const router = useRouter();
  const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
  const [messagesClick, setMessagesClick] = useState(false);
  const { data: session } = useSession();

  function addBookClickFunction() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(false);
  }

  function changeQuantityOfBooksClickFunction() {
    setChangeQuantityOfBooksClick(true);
    setMessagesClick(false);
  }

  function messagesClickFunction() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(true);
  }

  useEffect(() => {
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Manage Library</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={addBookClickFunction}
              className="nav-link active"
              id="nav-add-book-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-add-book"
              type="button"
              role="tab"
              aria-controls="nav-add-book"
              aria-selected="false"
            >
              Add new book
            </button>
            <button
              onClick={changeQuantityOfBooksClickFunction}
              className="nav-link"
              id="nav-quantity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-quantity"
              type="button"
              role="tab"
              aria-controls="nav-quantity"
              aria-selected="true"
            >
              Change quantity
            </button>
            <button
              onClick={messagesClickFunction}
              className="nav-link"
              id="nav-messages-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-messages"
              type="button"
              role="tab"
              aria-controls="nav-messages"
              aria-selected="false"
            >
              Messages
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-add-book"
            role="tabpanel"
            aria-labelledby="nav-add-book-tab"
          >
            <AddNewBook />
          </div>
          <div className="tab-pane fade" id="nav-quantity" role="tabpanel" aria-labelledby="nav-quantity-tab">
            {changeQuantityOfBooksClick && <ChangeQuantityOfBooks />}
          </div>
          <div className="tab-pane fade" id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab">
            {messagesClick && <AdminMessages />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
