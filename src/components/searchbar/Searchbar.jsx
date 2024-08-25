/* eslint-disable react/prop-types */

import { useState } from "react";

function Searchbar({ searchQuery, onSearchChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  return (
    <form className="max-w-lg " dir={'ltr'}>
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your Search
        </label>
       
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block text-black p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos, Design Templates..."

            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <i className="fa-solid fa-magnifying-glass "></i>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default Searchbar;
