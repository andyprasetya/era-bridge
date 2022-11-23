import { Link as LinkRouter } from "react-router-dom";
import { strLang } from "../functions/language";
import { hashRouterList, browserRouterList } from "../constants/routes";
import logoIdea from "../images/logo-idea.png";

export default function Footer() {
  return (
    <footer className="bg-primary-grayDark py-4 px-10 font-light flex flex-col lg:flex-row justify-between items-center">
      {/* Copyright & Year */}
      <div className="flex items-center">
        <a href={browserRouterList.copyright} target="_blank" rel="noreferrer">
          <img src={logoIdea} className="h-16" alt="International Idea" />
        </a>
        <p className="text-white whitespace-pre-line ml-1">
          {strLang.copyright_year + " " + new Date().getFullYear() + "\n"}
          <a
            href={browserRouterList.copyright}
            target="_blank"
            rel="noreferrer"
            className="text-primary-orange hover:text-primary-orangeDark"
          >
            {strLang.app_long_name}
          </a>
        </p>
      </div>
      {/* Other Footer Navigation */}
      <ul className="list-unstyled flex mt-2">
        {[
          {
            text: strLang.nav_about,
            nav: hashRouterList.about,
          },
          {
            text: strLang.nav_privacy_policy,
            nav: hashRouterList.privacyPolicy,
          },
          {
            text: strLang.nav_terms_and_conditions,
            nav: hashRouterList.termsAndConditions,
          },
        ].map((objData, idx) => (
          <li className="mr-6" key={idx}>
            <LinkRouter
              to={objData.nav}
              className="text-white hover:text-gray-200 font-medium block text-sm"
            >
              {objData.text}
            </LinkRouter>
          </li>
        ))}
      </ul>
    </footer>
  );
}
