import { useSelector } from "react-redux";
import { getUsername } from "../../util/auth";
export default function Message({ key, message, secondImg }) {
  const { img } = useSelector((state) => state.userData);
  return (
    <li key={key} className="flex  gap-3 my-3 ">
      <img
        src={message.author === getUsername() ? img : secondImg}
        alt="user"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <div className="flex gap-2 items-center">
          <h3 className="text-white font-semibold">{message.author}</h3>
          <h4 className="text-slate-500 text-sm mt-1">{message.time}</h4>
        </div>
        <p className="text-slate-400 text-sm mt-1 ">{message.message}</p>
      </div>
    </li>
  );
}
