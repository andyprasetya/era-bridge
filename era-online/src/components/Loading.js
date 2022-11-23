import React from "react";
import { strLang } from "../functions/language";
import spinner from "../images/spinner.svg";

export default function Loading() {
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-1/2 translate-y-1/2 z-50 -ml-8 -mt-8">
      <img src={spinner} className="max-h-16" alt={strLang.msg_loading} />
    </div>
  );
}
