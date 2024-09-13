import MiniPost from "./MiniPost";
import { useRef, useState } from "react";
const arrowClasses =
  "text-white absolute top-1/2 -translate-y-1/2 bg-slate-700 pt-3 rounded-full h-10 w-10 ";
export default function MiniPosts({ heading, posts }) {
  const ref = useRef();
  const [scrollVlaue, setScrollVlaue] = useState(0);
  function handleScroll(right) {
    if (right) {
      if (scrollVlaue > 0) {
        ref.current.scrollTo(scrollVlaue - 1000, 0);
        setScrollVlaue(scrollVlaue - 1000);
      }
    } else {
      if (scrollVlaue < 3000) {
        ref.current.scrollTo(scrollVlaue + 1000, 0);
        setScrollVlaue(scrollVlaue + 1000);
      }
    }
  }
  return (
    <div className="relative">
      <h2 className="text-2xl font-bold px-7 text-white mt-7">{heading}</h2>
      {posts?.length > 3 && (
        <div className="absolute top-0 left-0 w-full h-full ">
          <button onClick={() => handleScroll(true)}>
            {" "}
            <i
              className={
                arrowClasses + " fa-solid fa-angle-left left-2 sm:left-10 z-10 "
              }
            ></i>
          </button>
          <button onClick={() => handleScroll(false)}>
            {" "}
            <i
              className={arrowClasses + " fa-solid fa-angle-right right-2 z-10"}
            ></i>
          </button>
        </div>
      )}
      <ul
        className="flex gap-4 p-7 overflow-x-auto "
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        ref={ref}
      >
        {posts?.map((post, index) => (
          <MiniPost key={post.slug} post={post} index={index} />
        ))}
      </ul>
    </div>
  );
}
