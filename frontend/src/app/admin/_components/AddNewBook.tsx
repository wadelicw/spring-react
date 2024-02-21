import { AddBookRequest } from '@/types/addBookRequest';
import { useSession } from 'next-auth/react';
import { ReactElement, useState } from 'react';

export function AddNewBook(): ReactElement {
  // New Book
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [copies, setCopies] = useState(0);
  const [category, setCategory] = useState('Category');
  const { data: session } = useSession();

  // Displays
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  function categoryField(value: string) {
    setCategory(value);
  }

  async function submitNewBook() {
    const url = `${process.env.apiEndpoint}/admin/secure/add/book`;
    if (session && title !== '' && author !== '' && category !== 'Category'
      && description !== '' && copies >= 0) {
      const book: AddBookRequest = {
        title, author, description, copies, category,
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      };

      const submitNewBookResponse = await fetch(url, requestOptions);
      if (!submitNewBookResponse.ok) {
        throw new Error('Something went wrong!');
      }
      setTitle('');
      setAuthor('');
      setDescription('');
      setCopies(0);
      setCategory('Category');
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess
        && (
          <div className="alert alert-success" role="alert">
            Book added successfully
          </div>
        )}
      {displayWarning
        && (
          <div className="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
        )}
      <div className="card">
        <div className="card-header">
          Add a new book
        </div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label" htmlFor="author"> Author </label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  id="author"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label" htmlFor="dropdownMenuButton1"> Category</label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {category}
                </button>
                <ul id="addNewBookId" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><button type="button" onClick={() => categoryField('FE')} className="dropdown-item">Front End</button></li>
                  <li><button type="button" onClick={() => categoryField('BE')} className="dropdown-item">Back End</button></li>
                  <li><button type="button" onClick={() => categoryField('Data')} className="dropdown-item">Data</button></li>
                  <li><button type="button" onClick={() => categoryField('DevOps')} className="dropdown-item">DevOps</button></li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="Copies">Copies</label>
              <input
                type="number"
                className="form-control"
                name="Copies"
                id="Copies"
                required
                onChange={(e) => setCopies(Number(e.target.value))}
                value={copies}
              />
            </div>
            <div>
              <button type="button" className="btn btn-primary mt-3" onClick={submitNewBook}>
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
