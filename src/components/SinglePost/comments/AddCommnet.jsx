import TextareaAutosize from "react-textarea-autosize";
import { useRef } from "react";
import usePost from "../../../hooks/usePost";
import { addMainComment, addSubComment } from "../../../util/http";
export default function AddComment({ postSlug, setCurrentComments, id }) {
  const { setBody, setSend, isFetching, error, res } = usePost(addMainComment);
  const {
    setBody: setSubBody,
    setSend: setSubSend,
    isFetching: subIsFetching,
    error: subError,
    res: subRes,
  } = usePost(addSubComment);
  const ref = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const comment = data.get("comment");
    if (comment.trim() === "") return;
    if (id) {
      setSubBody({ id: postSlug, reply: comment, commentId: id });
      setSubSend(true);
    } else {
      setBody({ id: postSlug, comment });
      setSend(true);
    }
  }
  if (res?.success) {
    ref.current.value = "";
    setCurrentComments(res.comment);
  }
  if (subRes?.success) {
    ref.current.value = "";
    setCurrentComments(subRes.comment);
  }
  return (
    <form className="grow mt-4" onSubmit={handleSubmit}>
      <div
        className={`search  w-full px-4  py-1  rounded-xl  bg-search-background text-white outline-none`}
      >
        <TextareaAutosize
          ref={ref}
          placeholder="Add comment"
          name="comment"
          className={
            "inner-search bg-transparent  outline-none py-2 px-4 w-full resize-y "
          }
        />
        <span className="flex flex-row-reverse w-full  py-2">
          {!isFetching && !subIsFetching ? (
            <button className="text-white text-sm bg-blue-800 py-2 px-4 rounded-full ">
              add comment
            </button>
          ) : (
            <p className="text-sm ">Comment in the way</p>
          )}
        </span>
      </div>
    </form>
  );
}
