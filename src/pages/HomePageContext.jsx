import { useRef, createContext, useCallback } from "react";
import useInfinteFetch from "../hooks/useInfinteFetch";
import HomePage from "./HomePage";

const homeContext = createContext({
  ref: {
    current: null,
  },
});

export function HomeContextProvider() {
  const { data, isFetching, error, getMoreResults } = useInfinteFetch();
  const lastPostRef = useRef();
  const ref = useCallback((node) => {
    lastPostRef.current = node;
    if (node) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getMoreResults();
        }
      });
      observer.observe(lastPostRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  return (
    <homeContext.Provider value={{ ref, data, isFetching, error }}>
      <HomePage />
    </homeContext.Provider>
  );
}
export default homeContext;
