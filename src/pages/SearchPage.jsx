import { useParams } from "react-router-dom";
import { useState } from "react";
import Filter from "../components/ShowPosts/Filter";
import Posts from "../components/search/Posts";
import Subs from "../components/search/Subs";
// description
// :
// "hey"
// img
// :
// "hey"
// mainTitle
// :
// "hey"
// memberCount
// :
// 1
// members
// :
// (3) ['asdfs', 'asdfs', 'asdfs']
// subId
// :
// "explored"
// _id
// :
// "66d9ad673dfbc8a802359dfe"
const data2 = [
  {
    _id: "66d9ad673dfbc8a802359dfe",
    subId: "explored",
    mainTitle: "hey",
    description: "hey",
    img: "hey",
    memberCount: 1,
    members: ["asdfs", "asdfs", "asdfs"],
  },
];

export default function SearchPage({ data }) {
  const params = useParams();
  const filters = [{ id: 0, current: 0, options: ["Posts", "Subs"] }];
  const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <div className="px-5 sm:px-16 mt-10">
      <h2 className="text-3xl text-slate-100">Results For : {params.query} </h2>
      <Filter Recfilters={filters} setSelectedFilter={setSelectedFilter} />

      {selectedFilter === 1 && <Subs keword={params.query} />}
      {selectedFilter === 0 && <Posts keword={params.query} />}
    </div>
  );
}
