import { useEffect, useState, useRef } from "react";
import Headerlogo from "./Headerlogo";
import SearchBar from "./SearchBar";
import Options from "./Options";
import { sidebarActions } from "../../store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
export default function Header() {
  const [open, isOpen] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const ref = useRef();
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const resizeObserver = new ResizeObserver((entries) => {
    const { width } = entries[0].contentRect;
    if (width < 530) {
      isOpen(false);
    } else {
      isOpen(true);
    }
    setWidth(width);
    if (width < 1200) {
      dispatch(sidebarActions.closeSidebar());
    } else {
      dispatch(sidebarActions.openSidebar());
    }
  });
  useEffect(() => {
    resizeObserver.observe(ref.current);
  }, [ref]);

  return (
    <>
      <header
        className="flex justify-between items-center p-3 gap-1 sm:gap-5"
        ref={ref}
      >
        {!sidebar.sidebarOpen && (!forceOpen || width > 530) && (
          <button
            className={forceOpen ? `w-10` : `w-fit`}
            onClick={() => dispatch(sidebarActions.toggleSidebar())}
          >
            <i class="fa-solid fa-bars text-white text-2xl  mx-5"></i>
          </button>
        )}
        <Headerlogo forceOpen={forceOpen} width={width} />
        <SearchBar
          open={open}
          forceOpen={forceOpen}
          width={width}
          setForceOpen={setForceOpen}
        />
        <Options forceOpen={forceOpen} width={width} />
      </header>
      <div className="w-full h-0.5 bg-slate-800"></div>
    </>
  );
}
