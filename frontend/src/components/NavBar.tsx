import Link from "next/link";
import { FC } from "react";

export const NavBar: FC<{}> = () => {
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
              <Link className="nav-link" href="#">Homepage</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Search Books</Link>
            </li>

          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              <Link type="button" className="btn btn-outline-light" href="#">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}