import { useAnimate, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchBar({ open, forceOpen, width, setForceOpen }) {
  const [scope, animate] = useAnimate();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  function handleOnSubmit(e) {
    e.preventDefault();
    if (value) {
      navigate(`/search/${value}`);
    }
  }
  function handleOpenSearch() {
    if (width < 530) {
      setForceOpen((prev) => !prev);
      animate(
        scope.current,
        {
          x: forceOpen ? 0 : "0%",
          width: forceOpen ? "50%" : ["0%", "50%", "100%"],
        },
        { type: "tween", duration: 0.3 }
      );
    }
    if (value) {
      navigate(`/search/${value}`);
    }
  }
  return (
    <div className="grow  ">
      <motion.div
        ref={scope}
        layout
        className={`search flex-auto mx-auto ${
          open
            ? "max-w-96 mx-auto"
            : ` ${forceOpen ? " w-full py-1 " : " max-w-fit py-2"}`
        } px-5    rounded-full flex items-center  bg-search-background relative text-white outline-none`}
      >
        <form onSubmit={handleOnSubmit}>
          {" "}
          <button onClick={handleOpenSearch}>
            <i
              className={`fa-solid fa-magnifying-glass absolute top-1/2  ${
                forceOpen ? "left-7" : "left-5"
              }  -translate-x-1/2  -translate-y-1/2`}
            ></i>
          </button>
          {!(!open && !forceOpen) && (
            <input
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search"
              className={
                "inner-search bg-transparent  outline-none py-2 px-4 ms-2 "
              }
            />
          )}
        </form>
      </motion.div>
    </div>
  );
}
