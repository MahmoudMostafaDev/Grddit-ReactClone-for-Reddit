import { Children } from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ children, onClick, isLink, to }) {
  const Component = () => (
    <button
      className="px-16 py-4 text-xl hover:bg-slate-800 w-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
  return (
    <li className="w-full">
      {isLink ? <Link to={to}>{<Component />}</Link> : <Component />}
    </li>
  );
}
