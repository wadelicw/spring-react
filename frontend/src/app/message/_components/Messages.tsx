"use client";
import { Pagination } from "@/components/Pagination";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { Message } from "@/types/message";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

export const Messages: FC<{}> = () => {

  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const { data: session } = useSession();

  // Messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Pagination
  const [messagesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (session) {
        const url = process.env.apiEndpoint + `/messages/search/findByUserEmail?userEmail=${session.user.sub}&page=${currentPage - 1}&size=${messagesPerPage}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json"
          }
        };
        const messagesResponse = await fetch(url, requestOptions);
        if (!messagesResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const messagesResponseJson = await messagesResponse.json();
        console.log(messagesResponseJson);
        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsLoadingMessages(false);
    }
    fetchUserMessages().catch((error: any) => {
      setIsLoadingMessages(false);
    })
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isLoadingMessages) {
    return (
      <SpinnerLoading />
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {messages.length > 0 ?
        <>
          <h5>Current Q/A: </h5>
          {messages.map((message, index) => (
            <div key={index}>
              <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>Case #{index + 1}: {message.title}</h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                  <h5>Response: </h5>
                  {message.response && message.adminEmail ?
                    <>
                      <h6>{message.adminEmail} (admin)</h6>
                      <p>{message.response}</p>
                    </>
                    :
                    <p><i>Pending response from administration. Please be patient.</i></p>
                  }
                </div>
              </div>
            </div>
          ))}
        </>
        :
        <h5>All questions you submit will be shown here</h5>
      }
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>
  );
}