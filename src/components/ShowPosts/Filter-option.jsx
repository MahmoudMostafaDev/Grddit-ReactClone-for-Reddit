import { useState } from "react";
import { useFilter } from "./Filter";
export default function FilterOption({ id, setSelectedFilter }) {
  const { filters, setFilters } = useFilter();
  const [isOpen, setIsOpen] = useState(false);
  const currentFilter = filters.filter((item) => {
    return item.id == id;
  })[0];
  function handleClick() {
    setIsOpen((prev) => !prev);
  }
  function handleSelect(index) {
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters.filter((item) => {
        return item.id == id;
      })[0].current = index;
      return newFilters;
    });
    setSelectedFilter(index);
    setIsOpen(false);
  }
  window.addEventListener("click", (event) => {
    if (!event.target.closest(".filter-option")) {
      setIsOpen(false);
    }
  });
  return (
    <li className="relative">
      <button
        onClick={handleClick}
        className="filter-option flex items-center justify-between gap-2 hover:bg-slate-800 px-3 py-2 rounded-lg w-36"
      >
        <span className="text-white text-md ">
          {currentFilter.options[currentFilter.current]}
        </span>
        <i className="fa-solid fa-angle-down text-white mt-1"></i>
      </button>
      {isOpen && (
        <ul className="bg-slate-800 rounded-lg w-36 shadow-lg mt-1 absolute">
          {currentFilter.options.map((option, index) => {
            return (
              <li
                onClick={() => handleSelect(index)}
                key={index}
                className="flex items-center gap-2 text-white hover:bg-slate-200 hover:text-black px-4 py-2 rounded-lg"
              >
                <span className=" hover:text-black text-md">{option}</span>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
