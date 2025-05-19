import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-20 flex items-center justify-between text-xl px-10 shadow-md bg-white">
      <h3 className="font-dotum">
        <Link to="/" className="font-bold font-dotum">
          GameHub
        </Link>
      </h3>
      <nav>
        <Link to="/login" className="mr-5">
          login
        </Link>
        <Link to="/signup">sign up</Link>
        {/* <Link to="/">logout</Link> */}
      </nav>
    </header>
  );
}
