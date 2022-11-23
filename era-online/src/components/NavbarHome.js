import React from "react";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavbarJS from "./Navbar";
import { strLang } from "../functions/language";
import { hashRouterList } from "../constants/routes";
import { BTNLine, BTNLineWhite, BTNSolid, BTNSolidSecondary } from "./Button";
import NavbarTab from "./NavbarTab";
import { isAdmin, isLogin } from "../actions/user";
import { isSmallWindow } from "../functions/windowSize";

// Return Navbar for Home Components
export default function NavbarHome() {
  const { pathname } = useLocation();
  const history = useHistory();

  const tabList = [
    {
      label: strLang.nav_knowledge_hub,
      url: hashRouterList.knowledgeHub,
    },
    {
      label: strLang.nav_the_districting_workshop,
      url: hashRouterList.tutorial,
    },
    {
      label: strLang.nav_map_library,
      url: hashRouterList.mapLibrary,
    },
  ];

  return (
    <NavbarJS>
      {/* Add navbar for main features if not in home */}
      {pathname !== hashRouterList.home && (
        <>
          {isSmallWindow() ? (
            <select
              value={pathname}
              className="block text-base py-3 px-4 outline-none bg-primary-grayMain mr-auto"
              onChange={(e) => history.push(e.target.value)}
            >
              {tabList.map((tab, idx) => (
                <option key={idx} value={tab.url}>
                  {tab.label}
                </option>
              ))}
            </select>
          ) : (
            <ul className="flex">
              {tabList.map((item, idx) => (
                <NavbarTab key={idx} label={item.label} url={item.url} />
              ))}
            </ul>
          )}
        </>
      )}
      {/* Change sign button if login */}
      {isLogin() ? (
        <>
          {isSmallWindow() && pathname !== hashRouterList.home ? (
            <div />
          ) : (
            <ul className="flex flex-row space-x-1 ml-auto">
              {/* If Admin display admin button */}
              {isAdmin() && (
                <LinkRouter to={hashRouterList.admin}>
                  <BTNLineWhite size="small">{strLang.btn_admin}</BTNLineWhite>
                </LinkRouter>
              )}
              <LinkRouter to={hashRouterList.profile}>
                <BTNSolidSecondary size="small">
                  {strLang.btn_profile}
                </BTNSolidSecondary>
              </LinkRouter>
            </ul>
          )}
        </>
      ) : (
        <>
          {isSmallWindow() && pathname !== hashRouterList.home ? (
            <div />
          ) : (
            <ul className="flex flex-row space-x-1 ml-auto">
              {/* Adding SignUp and SignIn Button */}
              <LinkRouter to={hashRouterList.signUp}>
                <BTNLine size="small">{strLang.btn_sign_up}</BTNLine>
              </LinkRouter>
              <LinkRouter to={hashRouterList.signIn}>
                <BTNSolid size="small">{strLang.btn_sign_in}</BTNSolid>
              </LinkRouter>
            </ul>
          )}
        </>
      )}
    </NavbarJS>
  );
}
