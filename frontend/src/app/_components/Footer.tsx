import Link from 'next/link';
import { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <div className="main-color">
      <footer className="container d-flex flex-wrap
        justify-content-between align-items-center py-5 main-color"
      >
        <p className="col-md-4 mb-0 text-white">© Example Library App, Inc</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <Link href="/" className="nav-link px-2 text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/search" className="nav-link px-2 text-white">
              Search Books
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
