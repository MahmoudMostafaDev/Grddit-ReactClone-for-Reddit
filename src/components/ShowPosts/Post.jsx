import { formatDesc, formatVotes } from "../../util/Formaters";
import useFetch from "../../hooks/useFetch";

import { getSubs, vote } from "../../util/http";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import useVote from "../../hooks/useVote";
import { formatDate } from "../../util/Formaters";
import { useContext } from "react";
import authContext from "../../store/authContext";
const Post = forwardRef((prop, ref) => {
  const { data, error } = useFetch(getSubs, prop.post.subId);
  const { info, sendVote, voted } = useVote(false, prop.post.info);
  const { isLogged } = useContext(authContext);
  return (
    <li key={prop.key} ref={ref} className=" rounded-lg p-4 mt-5 bg-slate-800">
      <Link to={"/g/" + prop.post.subId + "/" + prop.post.slug + "/"}>
        <header className="flex items-center gap-3">
          <img
            src={data?.sub.img}
            alt="post"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-slate-300 text-lg">g/{data?.sub.subId}</p>
          <p className="text-slate-500 text-sm mt-2">
            {formatDate(prop.post.date)}
          </p>
        </header>
        <main>
          <p className="text-slate-100 text-2xl mt-2 font-bold">
            {prop.post.title}
          </p>
          <div className="bg-slate-700">
            {prop.post.img && (
              <img
                src={prop.post.img}
                alt="post"
                className="h-96 mx-auto my-8"
              ></img>
            )}
          </div>
          <p className="text-slate-400 mt-2 break-words">
            {formatDesc(prop.post.description)}
          </p>
        </main>
      </Link>
      <footer className="mt-5">
        <div className="flex items-center gap-3 ">
          <div className="flex items-center gap-3 bg-slate-800 px-3 py-2 rounded-full">
            <button
              disabled={voted || !isLogged}
              onClick={() => sendVote(prop.post.slug, "upvote")}
            >
              <i
                className={`fa-solid fa-arrow-up ${
                  voted
                    ? "text-primary "
                    : `text-white ${isLogged && "hover:text-primary"} `
                }`}
              ></i>
            </button>
            <p className="text-white text-lg">{formatVotes(info.upVotes)}</p>
            <button
              disabled={voted || !isLogged}
              onClick={() => sendVote(prop.post.slug, "downvote")}
            >
              <i
                className={`fa-solid fa-arrow-down ${
                  voted
                    ? "text-red-400 "
                    : `text-white ${isLogged && "hover:text-red-400"}`
                }`}
              ></i>
            </button>
            <p className="text-white text-lg">{formatVotes(info.downVotes)}</p>
          </div>
          <Link to={"/g/" + prop.post.subId + "/" + prop.post.slug + "/"}>
            <button className="flex items-center gap-3 bg-slate-800 px-3 py-2 rounded-full hover:bg-slate-600">
              <i className="fa-solid fa-message text-white"></i>
              <p className="text-white text-lg">
                {formatVotes(info.comments.length)}
              </p>
            </button>
          </Link>
        </div>
      </footer>
    </li>
  );
});
export default Post;
