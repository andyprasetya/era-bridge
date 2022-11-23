import { Link } from "react-router-dom";
import { strLang } from "../functions/language";
import { hashRouterList } from "../constants/routes";
import { BTNSolid } from "../components/Button";

export default function NotFound404() {
  return (
    <div className="bg-primary-grayDark">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-primary-blue">404</h1>
            <h1 className="text-6xl font-medium py-8">
              {strLang.page_not_found}
            </h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              {strLang.page_not_found_desc}
            </p>
            <Link to={hashRouterList.home}>
              <BTNSolid>{strLang.nav_home.toUpperCase()}</BTNSolid>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
