import React from "react";
import useFetch from "../../hooks/useFetch";
import { searchPosts } from "../../util/http";
import Postss from "../ShowPosts/Posts";
export default function Posts({ keword }) {
  const { data, isFetching, error } = useFetch(searchPosts, keword);
  return (
    <>
      {data && data.posts.length > 0 ? (
        <Postss posts={data.posts} />
      ) : (
        <div className="text-2xl mt-5  text-white">No posts found</div>
      )}
    </>
  );
}
