'use client';

import { Message } from '@/types/message';
import { useSession } from 'next-auth/react';
import { ReactElement, useState } from 'react';

export function PostNewMessage(): ReactElement {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const { data: session } = useSession();

  async function submitNewQuestion() {
    const url = `${process.env.apiEndpoint}/messages/secure/add/message`;
    if (session && title !== '' && question !== '') {
      const messageRequestModel: Message = { title, question };
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageRequestModel),
      };

      const submitNewQuestionResponse = await fetch(url, requestOptions);
      if (!submitNewQuestionResponse.ok) {
        throw new Error('Something went wrong!');
      }

      setTitle('');
      setQuestion('');
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="card mt-3">
      <div className="card-header">
        Ask question to Admin
      </div>
      <div className="card-body">
        <form method="POST">
          {displayWarning
            && (
              <div className="alert alert-danger" role="alert">
                All fields must be filled out
              </div>
            )}
          {displaySuccess
            && (
              <div className="alert alert-success" role="alert">
                Question added successfully
              </div>
            )}
          <div className="mb-3">
            <label className="form-label" htmlFor="exampleFormControlInput1">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="exampleFormControlTextarea1">
              Question
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
          </div>
          <div>
            <button type="button" className="btn btn-primary mt-3" onClick={submitNewQuestion}>
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
