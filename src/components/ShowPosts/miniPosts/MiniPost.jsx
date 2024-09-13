import { Link } from "react-router-dom";

export default function MiniPost({ post, key, index }) {
  return (
    <Link to={`/g/${post.subId}/${post.slug}`} key={key}>
      <li
        key={key}
        id={index}
        className="flex flex-col flex-shrink-0 gap-4 text-white relative rounded-3xl w-72 overflow-hidden"
      >
        <img
          src={
            post.img ||
            "https://random-image-pepebigotes.vercel.app/api/random-image"
          }
          alt="post"
          className="w-72 h-56 grayscale hover:grayscale-0"
        />
        <div
          className=" absolute w-72 bottom-0 left-0 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <p className="text-xl font-bold truncate">{post.title}</p>
          <p className="text-slate-400 truncate text-sm">{post.description}</p>
        </div>
      </li>
    </Link>
  );
}
