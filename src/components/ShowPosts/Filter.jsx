import FilterOption from "./Filter-option";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext({
  filters: [{ id: 0, current: null, options: [] }],
});
export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilter must be used within a Filter");
  }
  return ctx;
}

export default function Filter({ Recfilters, setSelectedFilter }) {
  const [filters, setFilters] = useState(Recfilters);

  const ctxValue = { filters, setFilters };
  return (
    <FilterContext.Provider value={ctxValue}>
      <ul className="flex mt-5 gap-4">
        {filters.map((filter) => (
          <FilterOption
            setSelectedFilter={setSelectedFilter}
            key={filter.id}
            id={filter.id}
          />
        ))}
      </ul>
    </FilterContext.Provider>
  );
}
