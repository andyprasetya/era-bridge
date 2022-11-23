import NavbarHome from "../components/NavbarHome";
import { useLocation } from "react-router-dom";
import { hashRouterList } from "../constants/routes";
import Footer from "../components/Footer";
import KnowledgeHub from "./contents/KnowledgeHub";
import Tutorial from "./contents/Tutorial";
import Home from "./contents/Home";
import MarginSpace from "../components/Margin";
import MapLibrary from "./map/MapLibrary";
import ViewData from "./map/ViewData";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Profile from "./user/Profile";
import User from "./user/User";
import Edit from "./user/Edit";
import Admin from "./user/Admin";
import UploadData from "./map/UploadData";

export default function Main() {
  const { pathname } = useLocation();
  return (
    <>
      <NavbarHome />
      {/* Display Home or Knowledge Hub based on pathname */}
      {pathname === hashRouterList.home ? (
        <Home />
      ) : pathname === hashRouterList.knowledgeHub ? (
        <KnowledgeHub />
      ) : pathname === hashRouterList.tutorial ? (
        <Tutorial />
      ) : // Display Map Data
      pathname === hashRouterList.mapLibrary ? (
        <MapLibrary />
      ) : pathname.startsWith(hashRouterList.viewData) ? (
        <ViewData />
      ) : pathname === hashRouterList.uploadData ? (
        <UploadData />
      ) : // Display User Information
      pathname === hashRouterList.signIn ? (
        <SignIn />
      ) : pathname === hashRouterList.signUp ? (
        <SignUp />
      ) : pathname === hashRouterList.profile ? (
        <Profile />
      ) : pathname.startsWith(hashRouterList.user) ? (
        <User />
      ) : pathname === hashRouterList.edit ? (
        <Edit />
      ) : pathname === hashRouterList.admin ? (
        <Admin />
      ) : (
        <div className="bg-primary-grayLight p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md p-8 mx-8">
              <MarginSpace />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
