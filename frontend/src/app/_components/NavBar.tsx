import { getServerSession } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { Logout } from "./Logout";

export const NavBar: FC<{}> = async () => {
  const session = await getServerSession();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Wade Fullstack Demo</span>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/">Homepage</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/search">Search Books</Link>
            </li>

          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              {
                !session ? (
                  <Link type="button" className="btn btn-outline-light" href="/login">
                    Sign in
                  </Link>
                ) : (
                  <Logout />
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}