import React from "react";
import { Link as LinkRouter, useLocation } from "react-router-dom";

export default function NavbarTab({ label, url }) {
  const { pathname } = useLocation();
  const navLinkClasses =
    "hover:bg-primary-grayMain flex gap-1 items-center text-sm uppercase font-medium text-white px-5 py-3 ";
  const navLinkActive = " bg-primary-grayMain ";

  return (
    // Tab for Navigation Bar
    <LinkRouter
      to={url}
      className={navLinkClasses + (pathname === url ? navLinkActive : "")}
    >
      {label}
    </LinkRouter>
  );
}
