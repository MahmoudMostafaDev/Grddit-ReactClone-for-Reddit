import ChatItem from "./ChatItem";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customChatActions } from "../../store";
import { getUsername } from "../../util/auth";
export default function SideBar({ chats = [], setCurrentChat, updateData }) {
  const customChat = useSelector((state) => state.customChat);
  const dispatch = useDispatch();
  const [error, setErrror] = useState(null);

  async function createNewChat() {
    try {
      const response = await fetch(
        "https://grddit-backend.onrender.com/api/chats",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userTwo: customChat.username }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setErrror(data.error);
        return;
      }
      setCurrentChat(data.roomId);
      dispatch(customChatActions.clearCustomChat());
      updateData();
    } catch (err) {
      setErrror(err.message);
      return;
    }
  }
  return (
    <div className=" px-5 pt-5  border-e-2 border-slate-800 h-full md:basis-1/3  basis-1/5 ">
      <h2 className="text-2xl font-bold text-white">Chats</h2>
      <ul className="w-full flex md:flex-col overflow-x-auto " style={{}}>
        {customChat.username == "" && !chats.length && (
          <p className="text-white mt-5">Go and talk to people</p>
        )}
        {customChat.username != "" &&
          !chats.some(
            (chat) =>
              chat.chat.users.includes(getUsername()) &&
              chat.chat.users.includes(customChat.username)
          ) && (
            <ChatItem
              onClick={createNewChat}
              key={customChat.username}
              chat={{
                chat: { messages: [] },
                secondUserData: {
                  username: customChat.username,
                  img: customChat.img,
                },
              }}
            />
          )}
        {chats.map((chat, index) => (
          <ChatItem
            onClick={() => setCurrentChat(chat.chat.roomId)}
            key={index}
            chat={chat}
          />
        ))}
      </ul>
    </div>
  );
}
