import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { popupActions, userDataActions } from "../store";
import ChatPop from "../components/Chat/ChatPop";
import ReactModal from "react-modal";
import Modal from "../components/AuthrizationCompoents/Modal";
import { useEffect, useState } from "react";
import { getTokenExpiration, getUsername } from "../util/auth";
import { useContext } from "react";
import { getRecent } from "../util/http";
import { recentActions } from "../store";
import authContext from "../store/authContext";
import socket from "../util/socket";
import { AnimatePresence } from "framer-motion";
export default function RootPage() {
  const { setIsLogged, isLogged } = useContext(authContext);
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const popup = useSelector((state) => state.popup);
  const [width, setWidth] = useState(window.innerWidth);

  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  if (token != null && token != "null") {
    setIsLogged(true);
  }
  window.onresize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    async function fetchRecent() {
      const recent = await getRecent();
      // dispatch(recentActions.clearRecent());
      dispatch(recentActions.loadRecent(recent.recent));
    }
    if (isLogged) {
      fetchRecent();
    }
  }, [recentActions, dispatch, isLogged]);
  useEffect(() => {
    async function getUserDataI() {
      try {
        const response = await fetch(
          `https://grddit-backend.onrender.com/api/user/${getUsername()}`
        );
        const res = await response.json();
        dispatch(userDataActions.updateUser(res));
      } catch (err) {
        submit(null, { method: "post", action: "/logout" });
      }
    }
    if (isLogged) {
      getUserDataI();
    }
  }, [getUsername, submit, isLogged]);
  useEffect(() => {
    if (token === "EXPIRED") {
      setIsLogged(false);
      submit(null, { method: "post", action: "/logout" });
    }
    if (token != null && token != "null") {
      setTimeout(() => {
        setIsLogged(false);
        submit(null, { method: "post", action: "/logout" });
      }, getTokenExpiration());
    }
  }, [getTokenExpiration, token, submit]);

  return (
    <div className="relative overflow-hidden">
      {popup.MessageisOpened && isLogged && <ChatPop />}
      <ReactModal
        isOpen={popup.LoginisOpened}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: "1220" },
          content: {
            zIndex: "20",
            padding: "0",
            border: "none",
            borderRadius: "30px",
            width: width < 900 ? "90%" : "50%", // change the width to 50% of the screen
            height: "75%", // change the height to 75% of the screen
            top: "50%", // center the modal vertically
            left: "50%", // center the modal horizontally
            right: "auto", // remove the default right margin
            bottom: "auto", // remove the default bottom margin
            marginRight: "-50%", // adjust the margin to center the modal
            transform: "translate(-50%, -50%)", // adjust the transform to center the modal
          },
        }}
        onRequestClose={() => dispatch(popupActions.closeLogin())}
      >
        <Modal></Modal>
      </ReactModal>
      <Header />
      <div className="flex relative ">
        <AnimatePresence>
          {(sidebar.sidebarOpen || sidebar.forceOpen) && (
            <Sidebar className="basis-72  border-slate-800 bg-background border-e-4 absolute sm:static h-full sm:h-auto " />
          )}
        </AnimatePresence>
        <div
          className=" grow overflow-y-auto "
          style={{ height: "calc(100vh - 90px)" }}
        >
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
