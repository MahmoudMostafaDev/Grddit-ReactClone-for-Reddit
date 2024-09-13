import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function usePost(fetchFn) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);
  const [send, setSend] = useState(false);
  const [body, setBody] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const response = await fetchFn(body);
        setError(null);
        setRes(response);
        setIsFetching(false);
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    if (send) {
      fetchData();
    }
  }, [send, body]);
  return {
    isFetching,
    error,
    res,
    setSend,
    setBody,
    body,
  };
}
