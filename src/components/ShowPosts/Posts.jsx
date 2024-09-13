import { useContext } from "react";
import Post from "./Post";
import homeContext from "../../pages/HomePageContext";
export default function Posts({ posts }) {
  const { ref } = useContext(homeContext);
  return (
    <>
      {posts && posts.length > 0 && (
        <ul>
          {posts.map((post, index) => {
            return (
              <Post
                ref={posts.length - 1 === index ? ref : null}
                key={post.slug + index}
                post={post}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
