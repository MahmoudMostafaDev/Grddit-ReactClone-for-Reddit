export default function ChatItem({ chat, onClick }) {
  return (
    <li className="min-w-52 block">
      <button
        onClick={onClick}
        className="flex items-center gap-3 mt-5 hover:bg-slate-700 p-2 rounded-md text-start"
      >
        <img
          src={chat.secondUserData?.img}
          alt=""
          className="min-w-12 max-h-12 rounded-full "
        />
        <div>
          <p className="text-white font-semibold">
            {chat.secondUserData?.username}
          </p>
          {chat.chat.messages.length > 0 && (
            <p className="text-slate-500 text-sm">
              {chat.chat.messages[chat.chat.messages.length - 1].message.slice(
                0,
                20
              ) + "..."}
            </p>
          )}
        </div>
      </button>
    </li>
  );
}
