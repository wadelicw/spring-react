import { Pagination } from '@/components/Pagination';
import { SpinnerLoading } from '@/components/SpinnerLoading';
import { AdminMessageRequest } from '@/types/adminMessageRequest';
import { Message } from '@/types/message';
import { useSession } from 'next-auth/react';
import {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { AdminMessage } from './AdminMessage';

export function AdminMessages(): ReactElement {
  // Normal Loading Pieces
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  // Messages endpoint State
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesPerPage] = useState(5);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Recall useEffect
  const [btnSubmit, setBtnSubmit] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (session) {
        const url = `${process.env.apiEndpoint}/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const messagesResponse = await fetch(url, requestOptions);
        if (!messagesResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const messagesResponseJson = await messagesResponse.json();

        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsLoadingMessages(false);
    };
    fetchUserMessages();
    window.scrollTo(0, 0);
  }, [currentPage, btnSubmit, session, messagesPerPage]);

  const submitResponseToQuestion = useCallback(async (id: number, response: string) => {
    const url = `${process.env.apiEndpoint}/messages/secure/admin/message`;
    if (session && id !== null && response !== '') {
      const messageAdminRequestModel: AdminMessageRequest = { id, response };
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageAdminRequestModel),
      };

      const messageAdminRequestModelResponse = await fetch(url, requestOptions);
      if (!messageAdminRequestModelResponse.ok) {
        throw new Error('Something went wrong!');
      }
      setBtnSubmit(!btnSubmit);
    }
  }, [session, btnSubmit]);

  if (isLoadingMessages) {
    return (
      <SpinnerLoading />
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-3">
      {messages.length > 0
        ? (
          <>
            <h5>Pending Q/A: </h5>
            {messages.map((message) => (
              <AdminMessage
                message={message}
                key={message.id}
                submitResponseToQuestion={submitResponseToQuestion}
              />
            ))}
          </>
        )
        : <h5>No pending Q/A</h5>}
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
