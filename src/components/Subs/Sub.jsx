import { formatVotes } from "../../util/Formaters";
import useJoinSub from "../../hooks/useJoinSub";
import { getUsername } from "../../util/auth";
const username = getUsername();
export default function Sub({ sub, key }) {
  const { handleJoining, members, isFetching } = useJoinSub(sub.subId);
  return (
    <li
      key={key}
      className="p-2 border border-slate-800 border-opacity-60 rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={sub.img}
            alt="sub logo"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-white font-semibold text-md">g/{sub.subId}</p>
            <p className="text-slate-500 text-sm">
              {formatVotes(sub.memberCount)} members
            </p>
          </div>
        </div>
        <button
          onClick={handleJoining}
          disabled={
            members.includes(username) ||
            sub.members.includes(username) ||
            isFetching
          }
          className={
            "text-white text-sm bg-blue-800 py-2 px-4 rounded-full " +
            (isFetching
              ? "bg-slate-400"
              : members.includes(username) || sub.members.includes(username)
              ? "bg-slate-700"
              : "bg-blue-600")
          }
        >
          {members.includes(username) || sub.members.includes(username)
            ? "Joined"
            : "Join"}
        </button>
      </div>
      <p className="text-slate-400 text-sm mt-2">{sub.mainTitle}</p>
    </li>
  );
}
