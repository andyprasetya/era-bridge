import React from "react";
import { useHistory } from "react-router-dom";
import { hashRouterList } from "../constants/routes";
import logo from "../images/logo-square.png";
import { strLang } from "../functions/language";
import { isSmallWindow } from "../functions/windowSize";

export default function NavbarJS({ children }) {
  const history = useHistory();

  return (
    <nav className="bg-primary-blue h-16 text-white sticky top-0 z-50 shadow-lg">
      <div className="flex flex-row justify-between items-center align-middle px-1 h-full">
        <img
          src={logo}
          alt={strLang.nav_home}
          className="h-14 inline mr-2 cursor-pointer"
          onClick={() => history.push(hashRouterList.home)}
        />
        {/* Adding custom child in here */}
        <div
          className="pr-8 mr-4 cursor-pointer border-r"
          onClick={() => history.push(hashRouterList.home)}
        >
          {isSmallWindow() ? strLang.app_short_name : strLang.app_long_name}
        </div>
        {children}
      </div>
    </nav>
  );
}
