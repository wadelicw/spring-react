'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FormEvent, ReactElement } from 'react';

export function RegisterForm(): ReactElement {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });
    if (response.ok) {
      redirect('/login');
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    className="form-control"
                  />
                </div>
                <div className="form-floating mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    <span> Register </span>
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <span className="p-2">
                  Have an account?
                </span>
                <Link href="/login">
                  Login now!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
