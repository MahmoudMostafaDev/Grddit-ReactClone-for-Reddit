import useFetch from "../../hooks/useFetch";
import { searchSubs } from "../../util/http";
import SubsContainer from "../Subs/SubsContainer";
export default function Subs(keword) {
  const { data, isFetching, error } = useFetch(searchSubs, keword);
  return (
    <div>
      {data && data.subs.length > 0 ? (
        <SubsContainer title="see.." subs={data.subs} />
      ) : (
        <div className="text-2xl mt-5  text-white">No subs found</div>
      )}
      {isFetching && <p className="text-slate-300">Loading...</p>}
    </div>
  );
}
