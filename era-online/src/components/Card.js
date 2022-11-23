import React from "react";

export default function Card({
  title,
  headColor = "bg-gradient-to-tr from-primary-orange to-primary-orangeDark shadow-lg-orange",
  children,
}) {
  return (
    <div className="px-4 mb-14">
      <div className="w-full border-black max-w-md mx-auto bg-white overflow-hdden shadow-md p-4">
        <div
          className={
            headColor +
            " -mt-10 mb-4 text-white grid items-center w-full h-24 py-4 px-8 justify-start"
          }
        >
          <h2 className="text-white text-2xl font-semibold">{title}</h2>
        </div>
        <div className="p-4 ">
          <div className="relative min-h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
