import { useEffect, useState } from "react";
import { joinSub } from "../util/http";
import usePost from "./usePost";
export default function useJoinSub(subId) {
  const { setBody, setSend, isFetching, res } = usePost(joinSub);
  const [members, setMembers] = useState([]);
  function handleJoining() {
    setBody(subId);
    setSend(true);
  }
  useEffect(() => {
    if (res) {
      setMembers(res.sub.members);
    }
  }, [res, setMembers]);

  return { handleJoining, members, isFetching };
}
