import { BsSearch } from "react-icons/bs";

const SearchInput = ({setState}) => {
  return (
    <div className="flex items-center dynamic-bg rounded-md w-96 md:w-full shadow-sm relative">
      <label htmlFor="search" className="absolute left-3">
        <BsSearch className="text-gray-500 mr-2" size="1.25rem" />
      </label>
      <input
        type="search"
        id="search"
        className="bg-transparent h-fit py-2 pr-2 pl-11 rounded w-full dynamic-text"
        autoComplete="off"
        placeholder="ค้นหา Resource"
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;