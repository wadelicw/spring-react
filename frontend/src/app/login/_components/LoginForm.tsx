"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";

export const LoginForm: FC<{}> = () => {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });
    console.log(response)
    if (response?.ok) {
      router.push("/");
      router.refresh();
    } else {
      window.alert("User name or password incorrect!");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LOGIN</p>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    name="email"
                    type="email"
                    id="floatingInput"
                    placeholder="Email"
                    className="form-control"
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-1">
                  <input
                    name="password"
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
  );
};