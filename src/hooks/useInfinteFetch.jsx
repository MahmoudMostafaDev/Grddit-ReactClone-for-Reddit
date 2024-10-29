import { useEffect, useState } from "react";

const numb = 2;
const attempt = 3;
export default function useInfinteFetch() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [lastStart, setLastStart] = useState(0);
  const [finished, setFinished] = useState(false);
  function getMoreResults() {
    if (!finished) {
      setLastStart((prev) => prev + numb);
    }
  }
  useEffect(() => {
    async function fetchdata() {
      setIsFetching(true);
      setError(null);
      for (let i = 0; i < attempt; i++) {
        try {
          const res = await fetch(
            "https://app-blue-wave-griddit.fly.dev/api/posts/getByNum?limit=" +
              numb +
              "&offset=" +
              lastStart
          );
          if (!res.ok) {
            throw new Error("error: " + res.status);
          }
          const data = await res.json();
          if (!data.success) {
            setFinished(true);
          }
          if (data.posts.length != 0) {
            setIsFetching(false);
            return setData((prev) => [...prev, ...data.posts]);
          }
        } catch (err) {
          if (i == attempt - 1) setError(err);
        }
        if (i == attempt - 1) setIsFetching(false);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(1);
          }, [1000]);
        });
      }
    }

    if (!finished) {
      fetchdata();
    }
  }, [
    lastStart,
    numb,
    setIsFetching,
    finished,
    setData,
    setError,
    setIsFetching,
  ]);
  return { data, isFetching, error, getMoreResults };
}
