import { useEffect, useState } from "react";
import img from "../../assets/Logo.jpg";
import { getSubs } from "../../util/http";
export default function Sub({ sub, key }) {
  const liClass = "flex items-center gap-3 px-5 py-3 mb-3";
  const spanClass = "text-slate-300  text-lg";
  const [subData, setSubData] = useState({});
  useEffect(() => {
    async function get() {
      const data = await getSubs(sub);
      setSubData(data.sub);
    }
    get();
  }, [sub]);
  return (
    <li className={liClass} key={key}>
      <img
        src={subData.img}
        alt="sub logo"
        className=" h-10 w-10  rounded-full"
      />
      <span className={spanClass}>g/{sub}</span>
    </li>
  );
}
