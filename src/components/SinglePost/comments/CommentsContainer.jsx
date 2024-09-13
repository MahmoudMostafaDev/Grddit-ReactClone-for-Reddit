import Comment from "./Comment";
export default function CommentsContainer({
  comments,
  postSlug,
  setCurrentComments,
}) {
  return (
    <>
      <ul className="mt-5">
        {comments &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              postSlug={postSlug}
              setCurrentComments={setCurrentComments}
            ></Comment>
          ))}
      </ul>
    </>
  );
}
