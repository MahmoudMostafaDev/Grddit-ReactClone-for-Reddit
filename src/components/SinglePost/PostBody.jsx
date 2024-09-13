import { formatVotes } from "../../util/Formaters";
import useFetch from "../../hooks/useFetch";
import { getPostData } from "../../util/http";
import CommentSection from "./comments/CommentSection";
import { Link, useParams } from "react-router-dom";
import useVote from "../../hooks/useVote";
import { formatDate } from "../../util/Formaters";
import { useEffect } from "react";
import { useContext } from "react";
import { formatDesc } from "../../util/Formaters";
import authContext from "../../store/authContext";
const widthClasses = "w-full md:w-mdS lg:w-lgS ";
export default function PostBody() {
  const param = useParams();
  const { isLogged } = useContext(authContext);
  const { data, error, isFetching } = useFetch(getPostData, param.postSlug);
  const { info, voted, sendVote, setInfo } = useVote(false, data?.post.info);

  useEffect(() => {
    if (data) {
      setInfo(data.post.info);
    }
  }, [data, setInfo]);
  return (
    <div className={"p-10 mx-auto " + widthClasses}>
      {isFetching && <p className="text-slate-300">Loading...</p>}
      {error && <p className="text-slate-300">{error.message}</p>}
      {data && (
        <>
          <header className="flex items-center gap-3">
            <button onClick={() => window.history.back()}>
              <i className="fa-solid fa-arrow-left text-stone-300 bg-slate-700 p-2 rounded-full"></i>
            </button>
            <Link
              to={`/g/${data.sub.subId}`}
              className="flex items-center gap-2"
            >
              <img
                src={data.sub.img}
                alt="post"
                className="w-10 h-10 rounded-full sm:block hidden"
              />
              <p className="text-slate-300 text-lg">g/{data.sub.subId}</p>
            </Link>
            <p className="text-slate-500 text-sm mt-2 sm:block hidden">
              {formatDate(data.post.date)}
            </p>
          </header>
          <main>
            <p className="text-slate-100 text-2xl mt-2 font-bold">
              {data.post.title}
            </p>
            <div className="bg-slate-700">
              {data.post.img && (
                <img
                  src={data.post.img}
                  alt="post"
                  className="h-96 mx-auto w-full my-8"
                ></img>
              )}
            </div>
            <p
              className="text-slate-400 mt-2 "
              style={{
                whiteSpace: "pre-wrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {formatDesc(data.post.description) || data.post.description}
            </p>
          </main>
          <footer className="mt-5">
            <div className="flex items-center gap-3 ">
              <div className="flex items-center gap-3 bg-slate-800 px-3 py-2 rounded-full">
                <button
                  disabled={voted || !isLogged}
                  onClick={() => sendVote(data.post.slug, "upvote")}
                >
                  <i
                    className={`fa-solid fa-arrow-up ${
                      voted ? "text-primary " : "text-white hover:text-primary"
                    }`}
                  ></i>
                </button>{" "}
                <p className="text-white text-lg">
                  {formatVotes(info?.upVotes)}
                </p>
                <button
                  disabled={voted || !isLogged}
                  onClick={() => sendVote(data.post.slug, "downvote")}
                >
                  <i
                    className={`fa-solid fa-arrow-down ${
                      voted ? "text-red-400 " : "text-white hover:text-red-400"
                    }`}
                  ></i>
                </button>{" "}
                <p className="text-white text-lg">
                  {formatVotes(info?.downVotes)}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-slate-800 px-3 py-2 rounded-full hover:bg-slate-600">
                <i className="fa-solid fa-message text-white"></i>
                <p className="text-white text-lg">
                  {formatVotes(info?.commentCount)}
                </p>
              </div>
            </div>
          </footer>
          <CommentSection comments={info?.comments} postSlug={param.postSlug} />
        </>
      )}
    </div>
  );
}
