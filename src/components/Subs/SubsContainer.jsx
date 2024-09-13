import { Link } from "react-router-dom";
import Sub from "./Sub";
export default function SubsContainer({ title, subs }) {
  return (
    <li>
      <h3 className="text-xl font-bold mb-4 text-white mt-7">{title}</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subs.map((sub, key) => (
          <Link key={key} to={`/g/${sub.subId}`}>
            <Sub key={key} sub={sub} />
          </Link>
        ))}
      </ul>
    </li>
  );
}
