import { getUsername } from "../../util/auth";
import { customChatActions, popupActions } from "../../store";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import authContext from "../../store/authContext";
export default function ProfileHeader({ username, img, banner }) {
  const dispatch = useDispatch();
  const { isLogged } = useContext(authContext);
  function handleChat() {
    dispatch(customChatActions.setCustomChat({ username, img }));
    dispatch(popupActions.toggleMessage());
  }
  const isCurrentUser = username === getUsername();
  return (
    <>
      <div className="relative">
        <img src={banner} alt="" className="w-full h-36 rounded-3xl" />
        <img
          src={img}
          alt=""
          className="w-24 h-24 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 sm:translate-x-0 sm:translate-y-0 sm:-bottom-12 sm:left-12 border-4 border-background"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:ms-40 text-center me-3 mt-16 sm:mt-2 justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white ">
          User/{username}
        </h1>
        {!isCurrentUser && isLogged && (
          <i
            onClick={handleChat}
            className="fa-brands fa-rocketchat w-1/2 sm:w-auto mx-auto cursor-pointer mt-2 bg-primary text-white px-3 py-2 text-xl rounded-full sm:me-2"
          ></i>
        )}
      </div>
    </>
  );
}
