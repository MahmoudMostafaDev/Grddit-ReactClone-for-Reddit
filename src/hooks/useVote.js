import usePost from "./usePost";
import { vote, commentVote } from "../util/http";
import { useState, useEffect } from "react";
export default function useVote(isComment, initailInfo) {
  const {
    res,
    error: err,
    isFetching,
    setSend,
    setBody,
    body,
  } = usePost(isComment ? commentVote : vote);
  const [voted, setVoted] = useState(false);
  const [info, setInfo] = useState(initailInfo);
  function sendVote(id, direction, commentId, subCommentId) {
    if (isComment) {
      setBody({ id, direction, commentId });
    } else {
      setBody({ id, direction });
    }
    setSend(true);
    setVoted(true);
  }
  useEffect(() => {
    if (res) {
      isComment ? setInfo(res.comment) : setInfo(res.post.info);
    }
  }, [res]);

  return {
    info,
    sendVote,
    voted,
    setInfo,
  };
}
