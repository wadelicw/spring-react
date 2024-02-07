import Link from "next/link";

import { FC } from "react";

const Login: FC<{}> = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LOGIN</p>
                <form >
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      id="floatingInput"
                      placeholder="Email"
                      className="form-control"
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating mb-1">
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
                      <span> Sign In </span>
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <span className="p-2">
                    Not a member?
                  </span>
                  <Link href="/register">
                    Sign up now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;