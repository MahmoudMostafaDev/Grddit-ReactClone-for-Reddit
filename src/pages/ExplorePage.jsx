import SubsContainer from "../components/Subs/SubsContainer";
import { getMiniSubs } from "../util/http";
import useFetch from "../hooks/useFetch";

export default function ExplorePage() {
  const { data, error, isFetching } = useFetch(getMiniSubs);
  return (
    <div className="p-7">
      <h2 className="text-4xl font-bold mb-10 text-white mt-7">
        Explore subs for you
      </h2>
      <ul>
        {data?.subs.length > 0 && (
          <SubsContainer title={"Popular subs"} subs={data?.subs.slice(0, 6)} />
        )}
        {data?.subs.length > 6 && (
          <SubsContainer
            title={"Recommended subs"}
            subs={data?.subs.slice(6, 12)}
          />
        )}
      </ul>
    </div>
  );
}
