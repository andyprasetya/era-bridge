import React from "react";

export default function Tab({ list = [], open, state }) {
  return (
    <nav className="flex flex-row justify-evenly">
      {list.map((tabLabel, idx) => (
        <button
          key={idx}
          onClick={() => state(idx)}
          className={
            open === idx
              ? "w-full py-4 px-6 block border-2 border-primary-orange focus:outline-none text-white font-bold bg-primary-orange hover:bg-primary-orangeDark"
              : "w-full py-4 px-6 block border-2 border-primary-orange text-primary-orange focus:outline-none"
          }
        >
          {tabLabel}
        </button>
      ))}
    </nav>
  );
}

export function TabChild({ list = [], open }) {
  if (open >= list.length) {
    return <div />;
  } else {
    return list[open];
  }
}
