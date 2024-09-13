import ProfileHeader from "../components/Profile/profileHeader";
import Posts from "../components/ShowPosts/Posts";
import { getUserInfo } from "../util/http";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function ProfilePage() {
  const params = useParams();
  const { data, error, isFetching, updateData } = useFetch(
    getUserInfo,
    params.username
  );
  const [firstLoad, setFirstLoad] = useState(true);
  if (data) {
    document.title = data.username;
    if (firstLoad) {
      setFirstLoad(false);
    }
  }

  useEffect(() => {
    if (!firstLoad) {
      updateData();
    }
  }, [params.username]);

  return (
    <>
      {data && (
        <>
          {" "}
          <div className="mx-auto  p-5">
            <ProfileHeader
              username={data?.username}
              img={data?.img}
              banner={data?.banner}
            />
            {data.postsObj.length ? (
              <h3 className="text-slate-200 text-3xl mt-10 p-6">
                Latest posts
              </h3>
            ) : (
              <h3 className="text-slate-200 text-3xl mt-10 p-6 text-center">
                No posts
              </h3>
            )}
            <Posts posts={data?.postsObj} />
          </div>
        </>
      )}

      {error && <p className="text-red-500">{error.message}</p>}
      {isFetching && <p className="text-gray-200 p-5">Loading...</p>}
    </>
  );
}
