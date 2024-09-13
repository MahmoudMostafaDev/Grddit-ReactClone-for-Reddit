import { useEffect, useState } from "react";

const numb = 1;
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
    function fetchdata() {
      try {
        setIsFetching(true);
        fetch(
          "https://grddit-backend.onrender.com/api/posts/getByNum?limit=" +
            numb +
            "&offset=" +
            lastStart
        )
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) {
              setFinished(true);
            }
            setData((prev) => [...prev, ...data.posts]);
          });
      } catch (err) {
        setError({ message: err.message });
      } finally {
        setIsFetching(false);
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
