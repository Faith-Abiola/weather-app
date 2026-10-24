
import { useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search-input">
        <img src={searchIcon} alt="" />
        <input
          type="text"
          placeholder="Search for a place..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;