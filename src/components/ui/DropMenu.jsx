import MenuItem from "./MenuItem";
import { useSubmit } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import authContext from "../../store/authContext";
import { getUsername } from "../../util/auth";
export default function DropMenu({ setMenuOpen }) {
  const ctx = useContext(authContext);
  const submit = useSubmit();
  return (
    <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      className=" absolute bg-slate-700 top-16 sm:right-0 rounded-2xl overflow-hidden border border-slate-900 shadow-xl right-0.5 -translate-x-0.5  sm:w-96 z-20 w-64 "
    >
      <MenuItem
        isLink
        to={`/u/${getUsername()}`}
        onClick={() => {
          setMenuOpen(false);
        }}
      >
        <div className="flex items-center gap-3 justify-center text-blue-400">
          <i class="fa-solid fa-user"></i>
          <p className="mb-1  text-center">My Profile</p>
        </div>
      </MenuItem>
      <MenuItem
        isLink
        to={"/create"}
        onClick={() => {
          setMenuOpen(false);
        }}
      >
        <div className="flex items-center gap-3 justify-center text-green-400 ">
          <i class="fa-solid fa-plus "></i>
          <p className="mb-1  text-center">Create sub</p>
        </div>
      </MenuItem>
      <MenuItem
        onClick={() => {
          ctx.setIsLogged(false);
          setMenuOpen(false);
          submit(null, { method: "post", action: "/logout" });
        }}
      >
        <div className="flex items-center gap-3 justify-center text-red-500">
          <i className="fa-solid fa-right-from-bracket"></i>
          <p className="mb-1">Logout</p>
        </div>
      </MenuItem>
    </motion.ul>
  );
}
