import { Fragment } from "react";
import { useEffect } from "react";

function GlobalSearchBar({ getData, search, setSearch, handleSearch }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      getData(1, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <Fragment>

      <div className="form-group">
        <label>Search</label>
        <input
          type="text"
          value={search}
          className="form-control"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
      </div>
      {/* <div className="col-md-1">
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div> */}
    </Fragment>
    
  );
}

export default GlobalSearchBar;
