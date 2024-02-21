import { Message } from '@/types/message';
import { ReactElement, useState } from 'react';

interface AdminMessageProps {
  message: Message,
  submitResponseToQuestion: (arg1: number, arg2: string) => void
}

export function AdminMessage({
  message,
  submitResponseToQuestion,
}: AdminMessageProps): ReactElement {
  const [displayWarning, setDisplayWarning] = useState(false);
  const [response, setResponse] = useState('');

  function submitBtn() {
    if (message.id && response !== '') {
      submitResponseToQuestion(message.id, response);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
    }
  }

  return (
    <div key={message.id}>
      <div className="card mt-2 shadow p-3 bg-body rounded">
        <h5>
          Case #
          {message.id}
          :
          {message.title}
        </h5>
        <h6>{message.userEmail}</h6>
        <p>{message.question}</p>
        <hr />
        <div>
          <h5>Response: </h5>
          <form action="PUT">
            {displayWarning
              && (
                <div className="alert alert-danger" role="alert">
                  All fields must be filled out.
                </div>
              )}
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="exampleFormControlTextarea1"> Description </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setResponse(e.target.value)}
                value={response}
              />
            </div>
            <div>
              <button type="button" className="btn btn-primary mt-3" onClick={submitBtn}>
                Submit Response
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
