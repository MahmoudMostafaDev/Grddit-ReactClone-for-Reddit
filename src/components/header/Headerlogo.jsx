import logo from "../../assets/Logo.jpg";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
export default function Headerlogo({ forceOpen, width }) {
  return (
    <Link to="/" className="Logo flex items-center gap-3 flex-shrink-0">
      <AnimatePresence>
        {(!forceOpen || width > 530) && (
          <>
            {" "}
            <motion.img
              src={logo}
              alt="logo"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              className={`max-w-12 rounded-full $`}
            />
            <h1 className="text-3xl font-mono font-bold mt-2 text-white hidden md:block">
              Grddit
            </h1>
          </>
        )}
      </AnimatePresence>
    </Link>
  );
}
