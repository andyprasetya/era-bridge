import React from "react";

export function BTNSolid({ size, className, children, style }) {
  if (size === "small") {
    size = " px-8 py-2 ";
  } else {
    size = " px-12 py-3 ";
  }
  return (
    <button
      className={
        "bg-primary-orange hover:bg-primary-orangeDark text-white font-semibold " +
        size +
        className
      }
      style={{...style}}
    >
      {children}
    </button>
  );
}

export function BTNLine({ size, className, children, style }) {
  if (size === "small") {
    size = " px-8 py-2 ";
  } else {
    size = " px-12 py-3 ";
  }
  return (
    <button
      className={
        "border border-primary-orange hover:border-primary-orangeDark text-primary-orange hover:text-primary-orangeDark font-semibold " +
        size +
        className
      }
      style={{...style}}
    >
      {children}
    </button>
  );
}

export function BTNSolidSecondary({ size, className, children }) {
  if (size === "small") {
    size = " px-8 py-2 ";
  } else {
    size = " px-12 py-3 ";
  }
  return (
    <button
      className={
        "bg-primary-grayMain hover:bg-primary-gray text-white font-semibold " +
        size +
        className
      }
    >
      {children}
    </button>
  );
}

export function BTNLineSecondary({ size, className, children }) {
  if (size === "small") {
    size = " px-8 py-2 ";
  } else {
    size = " px-12 py-3 ";
  }
  return (
    <button
      className={
        "border border-primary-grayMain hover:border-primary-gray text-primary-grayMain hover:text-primary-gray font-semibold " +
        size +
        className
      }
    >
      {children}
    </button>
  );
}

export function BTNLineWhite({ size, className, children }) {
  if (size === "small") {
    size = " px-8 py-2 ";
  } else {
    size = " px-12 py-3 ";
  }
  return (
    <button
      className={
        "border border-white hover:border-primary-grayMain text-white hover:text-primary-grayMain font-semibold " +
        size +
        className
      }
    >
      {children}
    </button>
  );
}
