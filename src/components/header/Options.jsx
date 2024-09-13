import { popupActions } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import authContext from "../../store/authContext";
import DropMenu from "../ui/DropMenu";
import { AnimatePresence } from "framer-motion";

export default function Options({ forceOpen, width }) {
  const { img } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const { isLogged } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {(!forceOpen || width > 530) && (
        <div className="options text-white ">
          {isLogged && (
            <div className="relative me-5 flex">
              <button onClick={() => dispatch(popupActions.toggleMessage())}>
                <i className="fa-brands fa-rocketchat bg-primary text-white px-3 py-2 text-xl rounded-full me-2"></i>
              </button>
              <button onClick={() => setMenuOpen((menu) => !menu)}>
                <img className="w-12 h-12 rounded-full" src={img} />
              </button>
              <AnimatePresence>
                {menuOpen && <DropMenu setMenuOpen={setMenuOpen} />}
              </AnimatePresence>
            </div>
          )}
          {!isLogged && (
            <>
              {" "}
              <button
                onClick={() => dispatch(popupActions.openLogin())}
                className="login bg-primary py-2 px-4 rounded-full font-bold "
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
