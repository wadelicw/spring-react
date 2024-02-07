"use client"
import Link from "next/link";
import { FC, FormEvent } from "react";

export const RegisterForm: FC<{}> = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    });
    console.log(response);
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
                  <input
                    type="email"
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    className="form-control"
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    id="floatingPassword"
                    placeholder="Password"
                    className="form-control"
                  />
                  <label htmlFor="floatingPassword">Password</label>
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
                <Link href="/">
                  Login now!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};