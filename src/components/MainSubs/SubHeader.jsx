import Button from "./Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../store/authContext";
import useFetch from "../../hooks/useFetch";
import { getUserInfo } from "../../util/http";
import { getUsername } from "../../util/auth";
import useJoinSub from "../../hooks/useJoinSub";
export default function SubHeader({ img, banner, subId }) {
  const navigate = useNavigate();
  const { handleJoining, members, isFetching } = useJoinSub(subId);
  const { data, error, setData } = useFetch(getUserInfo, getUsername());
  function hanldCreate() {
    navigate("create");
  }

  if (members.includes(getUsername()) && !data.subs.includes(subId)) {

    setData({ subs: data.subs.push(subId), ...data });
  }

  const ctx = useContext(authContext);

  return (
    <>
      <div className="relative">
        <img src={banner} alt="" className="w-full h-36 rounded-3xl" />
        <img
          src={img}
          alt=""
          className="w-24 h-24 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 sm:translate-x-0 sm:translate-y-0 sm:-bottom-12 sm:left-12 border-4 border-background"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:ms-40 text-center me-3 mt-16 sm:mt-2 justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white  ">
          g/{subId}
        </h1>
        {ctx.isLogged && (
          <div className="flex justify-center items-center gap-3 mt-5">
            <Button onClick={hanldCreate}>create post</Button>
            {data?.subs.includes(subId) && <Button disabled>Joined</Button>}
            {!error &&
              !data?.subs.includes(subId) &&
              (isFetching ? (
                <Button disabled>Joining</Button>
              ) : (
                <Button onClick={handleJoining}>Join</Button>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
