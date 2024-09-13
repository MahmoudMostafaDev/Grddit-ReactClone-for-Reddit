import Button from "../MainSubs/Button";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { popupActions } from "../../store";
import socket from "../../util/socket";
import { getUsername } from "../../util/auth";

export default function MessagesBody({ id, messages, addMessage }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const inputRef = useRef(null);
  async function sendMessage() {
    if (inputRef.current.value) {
      await socket.socket.emit("sendMessage", {
        author: getUsername(),
        message: inputRef.current.value,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        id,
      });

      addMessage(
        {
          author: getUsername(),
          message: inputRef.current.value,
          time: new Date().getHours() + ":" + new Date().getMinutes(),
        },
        id
      );
      inputRef.current.value = "";
    }
  }

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [ref?.current?.scrollHeight]);
  return (
    <div className=" w-full md:w-2/3 p-5 relative ">
      <button
        onClick={() => dispatch(popupActions.closeMessage())}
        className="text-white absolute right-5 top-5 hover:text-red-500"
      >
        Close
      </button>
      {!id && (
        <>
          <p className="text-center text-white text-3xl mt-10 ">
            Select a chat
          </p>
          <p className="text-center text-slate-400 mt-5 text-sm">
            Enjoy talking to wierd people only here in grddit (dont be simp)
          </p>
        </>
      )}
      {id && (
        <>
          <header className="border-b border-slate-700 pb-3 ">
            <h3 className="text-white text-lg">{messages.secondUsername}</h3>
          </header>
          <main className="flex flex-col">
            <ul className="overflow-y-scroll h-80 mt-2" ref={ref}>
              {messages.messages.map((message, index) => (
                <Message
                  key={index}
                  message={message}
                  secondImg={messages.secondImg}
                />
              ))}
            </ul>
          </main>
          <footer className="flex items-center gap-3 mt-5">
            <textarea
              placeholder="Type a message"
              ref={inputRef}
              rows={1}
              className="w-full overflow-hidden bg-search-background py-3 px-5 rounded-3xl text-white outline-none resize-none "
            />
            <Button onClick={sendMessage}>Send</Button>
          </footer>
        </>
      )}
    </div>
  );
}
