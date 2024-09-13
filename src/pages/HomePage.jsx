import { useContext } from "react";
import PostsContainer from "../components/ShowPosts/PostsContainer";
import homeContext from "./HomePageContext";
const widthClasses = "w-full md:w-mdS lg:w-lgS ";

export default function HomePage() {
  const { data, isFetching, error } = useContext(homeContext);
  return (
    <div className={"mx-auto " + widthClasses}>
      {data && <PostsContainer isHome={true} posts={data} />}
      {error && <p className="text-red-500">{error.message}</p>}
      {isFetching && <p className="text-gray-200 p-5">Loading...</p>}
    </div>
  );
}
