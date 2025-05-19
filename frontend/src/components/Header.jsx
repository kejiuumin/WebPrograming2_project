import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-20 flex items-center justify-between text-xl px-10">
      <h3 className="font-dotum">
        <Link to="/" className="font-bold font-dotum">
          LOGO
        </Link>
      </h3>
      <nav>
        <Link to="/" className="pr-5">
          login
        </Link>
        <Link to="/">sign up</Link>
      </nav>
    </header>
  );
}
