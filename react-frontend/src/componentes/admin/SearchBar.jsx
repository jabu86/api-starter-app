
import { useEffect,  } from "react";

function SearchBar({  getData , search , setSearch}) {
  
   useEffect(() => {
    const timer = setTimeout(() => {
      getData(1, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <div className="d-flex gap-2 mb-3">
      <input
        type="text"
        value={search}
        className="form-control"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      {/* <button
        className="btn btn-primary"
        onClick={handleSearch}
      >
        Search
      </button> */}
    </div>
  );
}

export default SearchBar;
