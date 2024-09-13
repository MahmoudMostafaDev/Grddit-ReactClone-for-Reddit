import { Children } from "react";

export default function Element({ selected, icon, children }) {
  const liClass = selected
    ? "flex items-center gap-4 px-5 py-3 mb-3 bg-search-background rounded-lg"
    : "flex items-center gap-4 px-5 py-3 mb-3";
  const spanClass = selected
    ? "text-white  text-lg"
    : "text-slate-400  text-lg";
  const iClass = selected
    ? " text-white  text-xl "
    : " text-slate-400  text-xl ";
  return (
    <li className={liClass}>
      <i className={iClass + icon}></i>
      <span className={spanClass}>{children}</span>
    </li>
  );
}
