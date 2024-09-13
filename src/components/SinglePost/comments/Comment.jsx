import { formatVotes } from "../../../util/Formaters";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { getUserInfo } from "../../../util/http";
import AddComment from "./AddCommnet";
import { formatDate } from "../../../util/Formaters";
import useVote from "../../../hooks/useVote";
import { Link } from "react-router-dom";
import { useContext } from "react";
import authContext from "../../../store/authContext";
export default function Comment({ comment, postSlug, setCurrentComments }) {
  const { isLogged } = useContext(authContext);
  const { data } = useFetch(getUserInfo, comment.author);
  const { info, sendVote, voted } = useVote(true, {
    upVotes: comment.upVotes,
    downVotes: comment.downVotes,
  });
  function handleVote(direction) {
    sendVote(postSlug, direction, comment.id);
  }
  const [replyOpen, setReplyOpen] = useState(false);
  function handleReplyClick() {
    setReplyOpen((replyOpen) => !replyOpen);
  }
  return (
    <li>
      <Link to={`/u/${comment.author}`}>
        {" "}
        <header className="flex items-center gap-3">
          <img src={data?.img} alt="user" className="w-10 rounded-full h-10" />
          <div className="flex flex-col">
            <h2 className="font-semibold text-white text-lg">
              {comment.author}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {formatDate(comment.date)}
            </p>
          </div>
        </header>
      </Link>
      <main>
        <p className="text-slate-100 text-lg mt-2 mb-4 px-4">{comment.text}</p>
      </main>
      {comment.mainComment && (
        <footer className="mt-2">
          <div className="flex items-center gap-3 ">
            <div className="flex items-center gap-3 px-3 py-2 rounded-full">
              <button
                disabled={voted || !isLogged}
                onClick={() => handleVote("upvote")}
              >
                <i
                  className={`fa-solid fa-arrow-up ${
                    voted ? "text-primary " : "text-white hover:text-primary"
                  }`}
                ></i>
              </button>{" "}
              <p className="text-white text-md">{formatVotes(info.upVotes)}</p>
              <button
                disabled={voted || !isLogged}
                onClick={() => handleVote("downvote")}
              >
                <i
                  className={`fa-solid fa-arrow-down ${
                    voted ? "text-red-400 " : "text-white hover:text-red-400"
                  }`}
                ></i>
              </button>
              <p className="text-white text-md">
                {formatVotes(info.downVotes)}
              </p>
            </div>

            <button
              className="flex items-center gap-3  px-3 py-2 rounded-full hover:bg-slate-600"
              onClick={handleReplyClick}
            >
              <i className="fa-solid fa-message text-white"></i>
              <p className="text-white text-md">
                {formatVotes(comment.replies.length)}
              </p>
            </button>
          </div>
        </footer>
      )}
      {replyOpen && isLogged && (
        <div className="p-0 sm:px-10">
          <AddComment
            id={comment.id}
            postSlug={postSlug}
            setCurrentComments={setCurrentComments}
          />
        </div>
      )}
      {comment.mainComment && (
        <ul className="mx-10 mt-4 flex flex-col gap-3">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </ul>
      )}
    </li>
  );
}
