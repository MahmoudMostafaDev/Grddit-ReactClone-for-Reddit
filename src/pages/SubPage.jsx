import Description from "../components/MainSubs/Description";
import SubHeader from "../components/MainSubs/SubHeader";
import MiniPosts from "../components/ShowPosts/miniPosts/MiniPosts";
import Posts from "../components/ShowPosts/Posts";
import useFetch from "../hooks/useFetch";
import { getSubs, getSubPosts } from "../util/http";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRecentAction } from "../store";
import { useContext, useEffect } from "react";
import authContext from "../store/authContext";
export default function SubPage() {
  const recent = useSelector((state) => state.recent.recent);

  const { subName } = useParams();

  const dispatch = useDispatch();
  const { isLogged } = useContext(authContext);

  const { data, isFetching, error, updateData } = useFetch(getSubs, subName);
  const {
    data: data2,
    isFetching: isFetching2,
    error: error2,
    updateData: updateData2,
  } = useFetch(getSubPosts, subName);
  useEffect(() => {
    if (isLogged && !recent.includes(subName) && data) {
      dispatch(addRecentAction(subName));
    }
  }, [isLogged, subName, data]);

  useEffect(() => {
    if (data && data2) {
      updateData();
      updateData2();
    }
  }, [subName]);

  return (
    <>
      {data ? (
        <div className="mx-auto  p-5">
          <SubHeader
            img={data?.sub.img}
            banner={data?.sub.banner}
            subId={data?.sub.subId}
          />
          <Description
            mainTitle={data?.sub.mainTitle}
            subId={data?.sub.subId}
            description={data?.sub.description}
            memberCount={data?.sub.memberCount}
          />
          {data2?.post && data2?.post[0] && (
            <MiniPosts heading="Popular" posts={data2?.post.slice(0, 6)} />
          )}

          {data2?.post ? (
            <Posts posts={data2?.post} />
          ) : (
            <p className="text-gray-400 text-lg p-10">No Posts</p>
          )}
        </div>
      ) : isFetching ? (
        <p className="text-gray-400 text-lg p-10">Loading...</p>
      ) : error ? (
        <p className="text-gray-400 text-lg p-10">{error.message}</p>
      ) : (
        <p className="text-gray-400 text-lg p-10">Not Found</p>
      )}
    </>
  );
}
