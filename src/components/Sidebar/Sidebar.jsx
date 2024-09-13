import Element from "./element";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sub from "./Sub";
import { motion } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import authContext from "../../store/authContext";
import { useSelector } from "react-redux";

export default function Sidebar({ ...props }) {
  const recent = useSelector((state) => state.recent.recent.slice(0, 5));

  const path = useLocation().pathname;
  const { isLogged } = useContext(authContext);
  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0.2 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0.2 }}
      style={{ zIndex: 10 }}
      {...props}
    >
      <ul className="p-8">
        <Link to={"/"}>
          {" "}
          <Element
            selected={path.startsWith("/home") || path === "/"}
            icon={"fa-solid fa-house"}
          >
            Home
          </Element>
        </Link>

        {isLogged && (
          <Link to={"/explore"}>
            {" "}
            <Element
              selected={path.startsWith("/explore")}
              icon={"fa-solid fa-star"}
            >
              Explore
            </Element>
          </Link>
        )}
      </ul>
      {isLogged && (
        <>
          <h2 className="text-slate-600 text-lg px-8 py-5">Recent</h2>
          <ul className="px-8">
            {recent.map((sub, index) => (
              <Link key={index} to={`/g/${sub}`}>
                <Sub key={index} sub={sub} />
              </Link>
            ))}
          </ul>
        </>
      )}
    </motion.div>
  );
}
