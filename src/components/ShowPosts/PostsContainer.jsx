import Filter from "./Filter";
import Posts from "./Posts";
import authContext from "../../store/authContext";
import { useContext } from "react";

export default function PostsContainer({ posts, isHome }) {
  const ctx = useContext(authContext);

  return (
    <div className="p-4 sm:p-10">
      {isHome && (!posts || posts?.length === 0) && (
        <p className="text-black font-bold text-2xl mt-10 bg-search-background w-fit p-6 rounded-2xl">
          {ctx.isLogged
            ? "Please join a sub to see posts"
            : "There is no posts"}{" "}
        </p>
      )}
      <Posts posts={posts} />
    </div>
  );
}
