import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

function Filter({ count, filterProducts, sortProducts, sort, size }) {
 

  return (
    <div className="row mb-2">
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-2">
            <p>
              Products{" "}
              <span className="badge rounded-pill text-bg-dark">
                {count}
              </span>
            </p>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label>Latest</label>
              <select
                className="form-control"
                value={sort}
                onChange={(e) => sortProducts(e)}
                name="sort"
              >
                <option value="">Select Sort</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label>Filter</label>
              <select
                className="form-control"
                onChange={(e) => filterProducts(e)}
                value={size}
                name="size"
              >
                <option value="">ALL</option>
                <option value="xxl">XXL</option>
                <option value="xl">XL</option>
                <option value="l">L</option>
                <option value="xxs">XXS</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Filter;
