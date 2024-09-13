import MessagesBody from "./MessagesBody";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getChats } from "../../util/http";
import socket from "../../util/socket";

export default function ChatPop() {
  const [currentChat, setCurrentChat] = useState(null);
  const { data, isFetching, error, updateData } = useFetch(getChats);
  const rooms = data?.chats && data.chats.map((chat) => chat.chat.roomId);
  rooms?.forEach((room) => {
    socket.socket.emit("joinRoom", room);
  });
  const [messagesContainer, setMessagesContainer] = useState([]);
  function addMessage(msg, roomId) {
    setMessagesContainer((prev) => {
      const newChat = prev.filter((chat) => chat.roomId == roomId)[0];
      newChat.messages = [...newChat.messages, msg];
      const newChats = prev.filter((chat) => chat.roomId != roomId);
      newChats.push(newChat);
      return newChats;
    });
  }
  useEffect(() => {
    socket.socket.on("receiveMessage", (msg) => {
      addMessage(
        {
          author: msg.author,
          message: msg.message,
          time: msg.time,
        },
        msg.id
      );
    });
  }, [socket.socket]);
  useEffect(() => {
    if (data && data.chats) {
      data.chats.forEach((chat) => {
        setMessagesContainer((prev) => {
          return [
            ...prev,
            {
              roomId: chat.chat.roomId,
              messages: chat.chat.messages,
              secondImg: chat.secondUserData?.img,
              secondUsername: chat.secondUserData?.username,
            },
          ];
        });
      });
    }
  }, [data]);

  return (
    <div className="text-slate-300 text-lg absolute flex gap-0  flex-col md:flex-row bg-black left-1/2 md:left-unset -translate-x-1/2 md:translate-x-0  md:right-10 -bottom-5 w-[calc(100%-2rem)]  md:w-chat h-[650px] md:h-chat z-40 rounded-lg border border-slate-700 ">
      <div>
        <SideBar
          chats={data?.chats}
          setCurrentChat={setCurrentChat}
          updateData={updateData}
        />
      </div>

      <MessagesBody
        addMessage={addMessage}
        id={currentChat}
        key={currentChat}
        messages={
          messagesContainer.filter((item) => item.roomId == currentChat)[0]
        }
      />
    </div>
  );
}
