import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchBox = () => {
  return (
    <div className="py-3 bg-[#F8FAFC] flex w-full justify-center">
      <div className="flex">
        <input
          type="search"
          className="outline-none px-3 border-2 border-[#F4F4F4] duration-500 focus:border-[#ED6620]"
          placeholder="Search"
          style={{ width: "300px" }}
        />
        {/*Search button*/}
        <button className="px-6 py-3 bg-[#ED6620] text-white" type="button">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
