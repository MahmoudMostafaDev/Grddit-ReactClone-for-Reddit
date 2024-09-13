import { useState } from "react";
import AddComment from "./AddCommnet";
import CommentsContainer from "./CommentsContainer";
import { useContext } from "react";
import authContext from "../../../store/authContext";
export default function CommentSection({ comments, postSlug }) {
  const [currentComments, setCurrentComments] = useState(comments);
  const { isLogged } = useContext(authContext);
  if (currentComments === undefined && comments) setCurrentComments(comments);
  return (
    <>
      {isLogged && (
        <AddComment
          postSlug={postSlug}
          setCurrentComments={setCurrentComments}
        />
      )}
      <CommentsContainer
        comments={currentComments}
        setCurrentComments={setCurrentComments}
        postSlug={postSlug}
      />
    </>
  );
}
