import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

function Filter({filterProducts, sortProducts, sort, size }) {
  return (
    <>
      <div className="col-md-4">
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
      <div className="col-md-4">
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
    </>
  );
}

export default Filter;
