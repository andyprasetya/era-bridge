import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { hashRouterList } from "../../constants/routes";

export default function Message() {
  const location = useLocation();
  if (location.state) {
    return (
      <div className="bg-primary-grayLight">
        <div className="w-9/12 m-auto py-8 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden pb-8">
            <div className="border-t border-gray-200 text-center pt-8 max-w-2xl">
              {location.state.message}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to={hashRouterList.home} />;
  }
}
