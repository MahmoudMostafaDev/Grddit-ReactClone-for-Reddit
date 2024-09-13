import { useEffect, useState } from "react";

export default function useFetch(fetchFn, ...params) {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [counter, setCounter] = useState(0);

  function updateData() {
    setCounter((prev) => prev + 1);
  }
  useEffect(() => {
    async function fetchdata() {
      try {
        setIsFetching(true);
        const data = await fetchFn(...params);
        setData(data);
      } catch (err) {
        setError({ message: err.message });
      } finally {
        setIsFetching(false);
      }
    }
    fetchdata();
  }, [fetchFn, counter]);

  return {
    data,
    error,
    isFetching,
    setData,
    updateData,
  };
}
